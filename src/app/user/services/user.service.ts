import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.model';
import {UserApiService} from './user-api.service';
import {Store} from '@ngxs/store';
import {EmptyCart} from '../../cart/cart-actions.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // tslint:disable-next-line:variable-name
  private _user = {} as User;
  private userSubject = new BehaviorSubject(this._user);
  userObservable: Observable<any>;
  constructor(private userApiService: UserApiService, private store: Store) {
    this.userObservable = this.userSubject.asObservable();
    this.rehydrate();
  }

  login(email: string, password: string): Observable<any> {
    return this.userApiService.login(email, password);
  }

  signUpFireBase(email: string, password: string): Observable<any> {
    return this.userApiService.signUpFireBase(email, password);
  }

  changePassword(newPassword: string): Observable<any> {
    return this.userApiService.changePassword(newPassword, this._user.idToken);
  }

  forgetPassword(email: string): Observable<any> {
    return this.userApiService.forgetPassword(email);
  }

  createUserSession(user: any): void {
    this._user = user;
    this.notify();
  }

  clearUserSession(): void {
    this._user = null;
    this.store.dispatch(new EmptyCart());
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
    this._user = JSON.parse(localStorage.getItem('user') as any);
    return this._user;
  }

  setToken(data: any): Observable<any> {
    return this.userApiService.setToken(data);
  }

  saveUser(user: User): Observable<any> {
    return this.userApiService.saveUser(user);
  }

  updateUserProfileFirebase(userDetails: any): Observable<any> {
    return this.userApiService.updateUserProfileFirebase(userDetails);
  }
}
