import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

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
}