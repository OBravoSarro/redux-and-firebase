import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor( private authService: AuthService ) { }

  ngOnInit() { }

  onSubmit( data: User ) {
    this.authService.login( data );
  }

}
