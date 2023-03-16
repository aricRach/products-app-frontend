import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {AddToCart} from '../../../cart/cart-actions.actions';
import {Product} from '../../../../types';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../authentication-styles.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  },
    {updateOn: 'change'}
    );
  errorMessage!: string;
  constructor(private userService: UserService, private router: Router, private store: Store, private snackBar: MatSnackBar) {
    this.showMessage();
  }

  private showMessage(): void {
    const message = this.router.getCurrentNavigation()?.extras?.state?.message;
    if (message) {
      this.snackBar.open(message,  '', {panelClass: 'notification'});
    }
  }

  doLogin(): void {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      this.userService.login(email, password).subscribe(
        (data: any) => {
          console.log('success', data);
          this.userService.setToken(data).subscribe(() => {
            this.errorMessage = '';
            this.userService.createUserSession(data);
            const addToCartItem = sessionStorage.getItem('itemToAdd');
            if (addToCartItem) {
              const item = JSON.parse(addToCartItem) as Product;
              if (email !== item.userOwner) {
                this.store.dispatch(new AddToCart(JSON.parse(addToCartItem)));
                sessionStorage.setItem('itemToAdd', null);
              }
            }
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
