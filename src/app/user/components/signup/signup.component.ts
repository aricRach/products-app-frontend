import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./../authentication-styles.css']
})
export class SignupComponent {

  signUpForm = new FormGroup({
      userName: new FormControl(null, [Validators.required, Validators.maxLength(12)]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    },
    {updateOn: 'change'}
  );
  errorMessage!: string;
  constructor(private userService: UserService, private router: Router) { }

  doSignUp(): void {
    if (this.signUpForm.valid) {
      const {email, password, userName} = this.signUpForm.value;
      this.userService.signUpFireBase(email, password).subscribe(
        (data: any) => {
          console.log('success', data);
          this.userService.saveUser({
            userName,
            email,
            idToken: data.idToken
          }).subscribe(() => {
            this.errorMessage = '';
            data.displayName = userName;
            this.userService.updateUserProfileFirebase(data);
            this.userService.createUserSession(data);
            this.router.navigate(['/']);
          });
        },
        (err) => {
          console.log('error', err);
          this.errorMessage = err.error.error.message;
        }
      );
    }
  }
}
