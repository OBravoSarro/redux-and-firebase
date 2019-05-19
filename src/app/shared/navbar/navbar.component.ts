import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AuthState } from '../../auth/auth.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {
  userName$: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.userName$ = this.store.select('auth').pipe(
      filter((auth: AuthState) => auth.user != null),
      map((auth: AuthState) => {
        return auth.user.name || '';
      })
    );
  }

}
