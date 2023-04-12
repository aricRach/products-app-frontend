import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../authentication-styles.css']
})
export class ResetPasswordComponent {

  errorMsg: string;
  resetPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required])
    },
    {
      updateOn: 'change'
    }
  );

  constructor(private userService: UserService, private router: Router) { }

  onSubmit(): void {
      this.userService.forgetPassword(this.resetPasswordForm.value.email).subscribe(() => {
        this.router.navigate(['/user/login'], {state: {
          message: 'check your inbox for password reset link'
        }});
      }, error => {
        console.error(error);
      });
  }
}
