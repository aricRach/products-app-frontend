import { Component } from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {AddToCart} from '../../../cart/cart-actions.actions';
import {Product} from '../../../../types';

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
    {updateOn: 'blur'}
    );
  errorMessage!: string;
  constructor(private userService: UserService, private router: Router, private store: Store) { }

  doLogin(): void {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      this.userService.login(email, password).subscribe(
        (data: any) => {
          console.log('success', data);
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
        },
        (err) => {
          console.log('error', err);
          this.errorMessage = err.error.error.message;
        }
      );
    }
  }

}
