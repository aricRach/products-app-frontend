import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../types';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  private url = 'http://localhost:8083/api/v1/products';

  constructor(private http: HttpClient) { }

  getProducts(userEmail: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.url, {params: {userEmail}});
  }

  getMyProducts(email: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/' + email);
  }

  geProductById(id: string): Observable<Product> {
    return this.http.get<Product>(this.url + '/single-product/' + +id);
  }
}
