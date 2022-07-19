import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { LoginButtonsComponent } from './login-buttons/login-buttons.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginButtonsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [LoginButtonsComponent]
})
export class UserModule { }
