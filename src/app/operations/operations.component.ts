import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Operation } from './operations.model';
import { OperationsService } from './operations.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivateLoadingAction, DesactivateLoadingAction } from '../shared/ui.actions';
import { Messages } from '../types/messages';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styles: []
})
export class OperationsComponent extends Messages implements OnInit, OnDestroy {

  form: FormGroup;
  type = 'income';
  loading: boolean;
  private loading$: Subscription;

  constructor(private _operations: OperationsService, private store: Store<AppState>) {
    super();
    this.loading$ = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = new FormGroup({
      'description': new FormControl('', Validators.required),
      'amount': new FormControl(0, Validators.min(0))
    });
  }

  changeType() {
    this.type = (this.type === 'income') ? 'withdrawal' : 'income';
  }

  saveOperation() {
    if (this.form.valid) {
      this.store.dispatch(new ActivateLoadingAction());

      const opeation: Operation = new Operation({
        ...this.form.value, type: this.type
      });

      this._operations.createOperation(opeation)
        .then(() => {
          this.success('Operación guardada con éxito');
          this.form.reset({ amount: 0 });
          this.type = 'income';
          this.store.dispatch(new DesactivateLoadingAction());
        })
        .catch(err => {
          this.error(err);
          this.store.dispatch(new DesactivateLoadingAction());
        });
    }
  }

  ngOnDestroy() {
    this.loading$.unsubscribe();
  }

}
