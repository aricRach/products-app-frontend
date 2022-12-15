import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-login-buttons',
  templateUrl: './login-buttons.component.html',
  styleUrls: ['./login-buttons.component.css']
})
export class LoginButtonsComponent {

  @Input() isAuthenticated = false;

  @Output() logOutClicked = new EventEmitter();

  constructor() { }

  logout(): void {
    this.logOutClicked.emit();
  }
}
