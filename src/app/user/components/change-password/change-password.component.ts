import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {checkFieldsMatch} from '../auth-validators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./../authentication-styles.css']
})
export class ChangePasswordComponent implements OnInit {

  errorMsg: string;
  changePassForm = new FormGroup({
      oldPassword: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [Validators.required]),
      newPassword2: new FormControl(null, [Validators.required]),
    },
    {
      updateOn: 'blur',
      validators: checkFieldsMatch('newPassword', 'newPassword2')
    }
  );

  constructor(private userService: UserService, private auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    if (this.changePassForm.valid) {
     const oldPassIsValid = await this.checkOldPassword();
     if (oldPassIsValid) {
       this.changePassword();
     }
    }
  }

  changePassword(): void {
      const {newPassword} = this.changePassForm.value;
      this.userService.changePassword(newPassword, this.userService.getUser().idToken).subscribe((user: User) => {
        console.log('password changed');
        this.userService.createUserSession(user);
        this.changePassForm.reset();
        this.router.navigate(['/']);
      }, (err) => {
        console.log(err);
      });
  }

  async checkOldPassword(): Promise<boolean> {
    const {oldPassword} = this.changePassForm.value;
    const email = this.userService.getUser().email;
    try {
      await this.auth.signInWithEmailAndPassword(email, oldPassword);
      this.errorMsg = '';
      return true;
    } catch (e) {
      const error = 'password not match the old one';
      console.error(error);
      this.errorMsg = error;
      return false;
    }
  }
}
