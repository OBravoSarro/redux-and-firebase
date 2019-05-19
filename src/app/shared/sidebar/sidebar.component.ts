import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { OperationsService } from '../../operations/operations.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { AuthState } from '../../auth/auth.reducer';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent {

  userName$: Observable<string>;

  constructor(private _auth: AuthService, private _operations: OperationsService, private store: Store<AppState>) {
    this.userName$ = this.store.select('auth').pipe(
      filter((auth: AuthState) => auth.user != null),
      map((auth: AuthState) => {
        return auth.user.name || '';
      })
    );
  }

  logout() {
    this._operations.cancelSubscriptions();
    this._auth.logout();
  }

}
