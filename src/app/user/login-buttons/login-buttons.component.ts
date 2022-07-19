import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-buttons',
  templateUrl: './login-buttons.component.html',
  styleUrls: ['./login-buttons.component.css']
})
export class LoginButtonsComponent implements OnInit {

  isAuthenticated = false;
  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.userObservable.subscribe(
      (user) => (this.isAuthenticated = !!user)
    );
  }

  logout(): void {
    this.userService.clearUserSession();
    this.router.navigate(['/']);
  }

}
