import { Component, OnDestroy } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnDestroy {

  loading: boolean;

  private loading$: Subscription;

  constructor( private authService: AuthService, private store: Store<AppState> ) {
    this.loading$ = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
  }

  ngOnDestroy() {
    this.loading$.unsubscribe();
  }

  onSubmit( data: User ) {
    this.authService.login( data );
  }

}
