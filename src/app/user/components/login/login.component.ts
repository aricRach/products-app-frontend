import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {AddToCart} from '../../../cart/cart-actions.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  },
    {updateOn: 'blur'}
    );
  errorMessage!: string;
  constructor(private userService: UserService, private router: Router, private store: Store) { }

  ngOnInit(): void {
  }

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
            this.store.dispatch(new AddToCart(JSON.parse(addToCartItem)));
            sessionStorage.setItem('itemToAdd', null);
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
