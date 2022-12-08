import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.model';
import {UserApiService} from './user-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // tslint:disable-next-line:variable-name
  private _user = {} as User;
  private userSubject = new BehaviorSubject(this._user);
  userObservable: Observable<any>;
  constructor(private userApiService: UserApiService) {
    this.userObservable = this.userSubject.asObservable();
    this.rehydrate();
  }

  login(email: string, password: string): Observable<any> {
    return this.userApiService.login(email, password);
  }

  signUpFireBase(email: string, password: string): Observable<any> {
    return this.userApiService.signUpFireBase(email, password);
  }

  createUserSession(user: any): void {
    this._user = user;
    this.notify();
  }

  clearUserSession(): void {
    this._user = null;
    this.notify();
  }

  notify(): void {
    localStorage.setItem('user', JSON.stringify(this._user));
    this.userSubject.next(this._user);
  }

  private rehydrate(): void { // get the initial data of the user for hard reload cases
    if (localStorage.getItem('user')) {
      this._user = JSON.parse(localStorage.getItem('user') as any);
      this.userSubject.next(this._user);
    }
  }

  public getUser(): User {
    return this._user;
  }
}
