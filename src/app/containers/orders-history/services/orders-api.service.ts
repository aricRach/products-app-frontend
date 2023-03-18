import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class OrdersApiService {

  constructor(private http: HttpClient) { }

  getOrdersHistory(userEmail: string): Observable<any> {
    return this.http.get(`http://localhost:8083/api/v1/user/orders/${userEmail}`);
  }
}
