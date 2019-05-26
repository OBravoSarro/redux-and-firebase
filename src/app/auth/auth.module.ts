import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
    LoginComponent,
    RegisterComponent
];
const MODULES = [
    CommonModule,
    RouterModule,
    FormsModule,
    AngularFireAuthModule
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [...MODULES]
})
export class AuthModule {

}
