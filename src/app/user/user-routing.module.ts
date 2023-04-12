import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {NotLoggedInGuard} from './guards/not-logged-in.guard';
import {SignupComponent} from './components/signup/signup.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {AuthGuard} from './guards/auth.guard';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [NotLoggedInGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [NotLoggedInGuard]},
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [NotLoggedInGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
