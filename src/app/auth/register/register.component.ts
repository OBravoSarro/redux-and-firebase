import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor( private authService: AuthService ) { }

  ngOnInit() { }

  onSubmit( data: User ) {
    this.authService.createUser( data );
  }

}
