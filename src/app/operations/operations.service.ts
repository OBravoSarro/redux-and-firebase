import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Operation } from './operations.model';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction } from './store/operations.actions';
import { Subscription } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  private listenerSubscription: Subscription = new Subscription();
  private itemsSubscription: Subscription = new Subscription();

  constructor(private afFB: AngularFirestore, private _auth: AuthService, private store: Store<AppState>) {}

  initOperationsListener() {
    this.listenerSubscription = this.store.select('auth')
    .pipe(
      filter(auth => auth.user != null)
    )
    .subscribe(auth => this.operationsItems(auth.user.uid));
  }

  private operationsItems(uid: string) {
    this.itemsSubscription = this.afFB.collection(`${uid}/operations/items`, ref => ref.orderBy('create', 'desc'))
    .snapshotChanges().pipe(
      map(docData => {
        return docData.map(doc => {
          const operation = {
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data()
          };
          return operation as Operation;
        });
      })
    )
    .subscribe(
      (items: Operation[]) => this.store.dispatch(new SetItemsAction(items))
    );
  }

  cancelSubscriptions() {
    this.listenerSubscription.unsubscribe();
    this.itemsSubscription.unsubscribe();
  }

  createOperation(operation: Operation) {
    const user = this._auth.getUser();
    return this.afFB.doc(`${user.uid}/operations`).collection('items').add({ ...operation });
  }

  deleteOperation(uid: string): Promise<void> {
    const user: User = this._auth.getUser();
    return this.afFB.doc(`${user.uid}/operations/items/${uid}`).delete();
  }

}
