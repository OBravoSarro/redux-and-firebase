import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { User } from '../models/user';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivateLoadingAction, DesactivateLoadingAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authSubscription$: Subscription = new Subscription();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        this.authSubscription$ = this.afDB.doc(`${fbUser.uid}/user`).valueChanges().subscribe((user: any) =>
          this.store.dispatch(new SetUserAction(new User(user))));
      } else {
        this.authSubscription$.unsubscribe();
      }
    });
  }

  createUser(dataUser: User) {
    this.store.dispatch( new ActivateLoadingAction() );
    this.afAuth.auth
      .createUserWithEmailAndPassword(dataUser.email, dataUser.password)
      .then(data => {
        const user = { ...data, name: dataUser.name };
        this.createUserCollection(user);
      })
      .catch(error => {
        this.showAlert(error.message);
      });
  }
  private createUserCollection(data) {
    const user: User = {
      uid: data.user.uid,
      name: data.name,
      email: data.user.email
    };
    this.afDB
      .doc(`${user.uid}/user`)
      .set(user)
      .then(() => {
        this.router.navigate(['/']);
        this.store.dispatch( new DesactivateLoadingAction() );
      })
      .catch(error => {
        this.store.dispatch( new DesactivateLoadingAction() );
        this.showAlert(error.message);
      });
  }

  login(dataUser: User) {
    this.store.dispatch( new ActivateLoadingAction() );
    this.afAuth.auth
      .signInWithEmailAndPassword(dataUser.email, dataUser.password)
      .then(data => {
        this.store.dispatch( new DesactivateLoadingAction() );
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.store.dispatch( new DesactivateLoadingAction() );
        this.showAlert(error.message);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  isAuth() {
    return this.afAuth.authState.pipe(
      map(fbUser => {
        if (fbUser == null) {
          this.router.navigate(['/login']);
        }
        return fbUser != null;
      })
    );
  }

  private showAlert(message: string) {
    Swal.fire({
      title: 'Error',
      text: message,
      type: 'error'
    });
  }
}
