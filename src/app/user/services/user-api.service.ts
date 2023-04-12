import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`;
    const data = {email, password, returnSecureToken: true};
    return this.httpClient.post(url, data);
  }

  signUpFireBase(email: string, password: string): Observable<any> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`;
    const data = {email, password, returnSecureToken: true};
    return this.httpClient.post(url, data);
  }

  saveUser(user: User): Observable<any> {
    return this.httpClient.post('http://localhost:8083/api/v1/user', user);
  }

  changePassword(password: string, idToken: string): Observable<any> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`;
    const data = {idToken, password, returnSecureToken: true};
    return this.httpClient.post(url, data);
  }

  forgetPassword(email: string): Observable<any> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.apiKey}`;
    const data = {requestType: 'PASSWORD_RESET', email};
    return this.httpClient.post(url, data);
  }

  setToken(user: User): Observable<any> {
    const url = `http://localhost:8083/api/v1/user/set-token`;
    return this.httpClient.post(url, user, {responseType: 'text'});
  }

  updateUserProfileFirebase(userDetails: any): Observable<any> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`;
    return this.httpClient.post(url, userDetails);
  }
}
