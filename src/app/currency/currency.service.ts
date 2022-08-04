import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

// creating a singleton instance, by registering it at root level (app.module.ts)
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  // tslint:disable-next-line:variable-name
  private _code = 'INR'; // israeli ILS
  private currencySubject = new BehaviorSubject(this._code);
  // SUBJECT : will only give the next data
  // BEHAVIORSUBJECT : initial data + next data
  // subscribe to this observable to retrieve the currency code
  currencyObservable: Observable<string>;
  constructor() {
    this.currencyObservable = this.currencySubject.asObservable();
    this.rehydrate();
  }

  rehydrate(): void {
    if (localStorage.getItem('currency')) {
      this._code = localStorage.getItem('currency') as string;
      this.currencySubject.next(this._code);
    }
  }

  updateCurrency(code: string): void {
    this._code = code;
    // on every data change, a notification needs to be provided to all the subscribers
    this.currencySubject.next(this._code);
  }
}
