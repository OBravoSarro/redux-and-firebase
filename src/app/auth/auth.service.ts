import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivateLoadingAction, DesactivateLoadingAction } from '../shared/ui.actions';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';
import { Messages } from '../types/messages';
import { UnsetItemsAction } from '../operations/store/operations.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Messages {

  private authSubscription$: Subscription = new Subscription();
  private user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
  ) {
    super();
  }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        this.authSubscription$ = this.afDB.doc(`${fbUser.uid}/user`).valueChanges().subscribe(
          (user: any) => {
            this.store.dispatch(new SetUserAction(new User(user)));
            this.user = new User(user);
          }
        );
      } else {
        this.user = null;
        this.authSubscription$.unsubscribe();
      }
    });
  }

  createUser(dataUser: User) {
    this.store.dispatch(new ActivateLoadingAction());
    this.afAuth.auth
      .createUserWithEmailAndPassword(dataUser.email, dataUser.password)
      .then(data => {
        const user = { ...data, name: dataUser.name };
        this.createUserCollection(user);
      })
      .catch(error => {
        this.error(error.message);
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
        this.store.dispatch(new DesactivateLoadingAction());
      })
      .catch(error => {
        this.store.dispatch(new DesactivateLoadingAction());
        this.error(error.message);
      });
  }

  login(dataUser: User) {
    this.store.dispatch(new ActivateLoadingAction());
    this.afAuth.auth
      .signInWithEmailAndPassword(dataUser.email, dataUser.password)
      .then(data => {
        this.store.dispatch(new DesactivateLoadingAction());
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.store.dispatch(new DesactivateLoadingAction());
        this.error(error.message);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.store.dispatch(new UnsetItemsAction());
    this.store.dispatch(new UnsetUserAction());
    this.store.dispatch(new DesactivateLoadingAction());
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

  public getUser() {
    return { ...this.user };
  }
}
