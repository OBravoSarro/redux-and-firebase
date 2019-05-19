import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Operation } from '../operations.model';
import { OperationsState } from '../store/operations.reducer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OperationsService } from '../operations.service';
import { Messages } from '../../types/messages';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent extends Messages {

  operations$: Observable<Operation[]>;

  constructor(private store: Store<AppState>, private _operations: OperationsService) {
    super();

    this.operations$ = this.store.select('operations').pipe(
      map((operationsStore: OperationsState) => operationsStore.items)
    );
  }

  deleteOperation (operation: Operation) {
    this._operations.deleteOperation(operation.uid)
    .then(() => this.success( operation.description, 'Eliminado'))
    .catch(error => this.error(error.message));
  }

}
