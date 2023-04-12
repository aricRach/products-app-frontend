import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from 'firebase';

@Component({
  selector: 'app-login-buttons',
  templateUrl: './login-buttons.component.html',
  styleUrls: ['./login-buttons.component.css']
})
export class LoginButtonsComponent {

  @Input() authenticatedUser: User;

  @Output() logOutClicked = new EventEmitter();

  constructor() {}

  logout(): void {
    this.logOutClicked.emit();
  }
}
