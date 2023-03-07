import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../authentication-styles.css']
})
export class ResetPasswordComponent implements OnInit {

  errorMsg: string;
  resetPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required])
    },
    {
      updateOn: 'change'
    }
  );

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {}

  onSubmit(): void {
      // this.userService.forgetPassword(this.resetPasswordForm.value.email).subscribe(() => {
      //   this.router.navigate(['/login'], {state: {
      //     message: 'check your inbox for password reset link'
      //   }});
      // }, error => {
      //   console.error(error);
      // });
    this.router.navigate(['/login'], {state: {
        message: 'check your inbox for password reset link'
    },
    });
  }
}
