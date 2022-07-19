import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductType} from '../../types';
import {Observable} from 'rxjs';

// @Injectable({
//   providedIn: 'root' // alternative to register a service globally, it makes the service singelton
// })
@Injectable() // service is locally
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductType[]> {
    const url = 'https://raw.githubusercontent.com/mdmoin7/Random-Products-Json-Generator/master/products.json';
    return this.http.get<ProductType[]>(url);
  }
}
