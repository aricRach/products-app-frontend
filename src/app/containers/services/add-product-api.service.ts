import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductBackEnd} from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class AddProductApiService {

  constructor(private http: HttpClient) { }

  updateProduct(id: number, product: ProductBackEnd): Observable<any> {
    return this.http.put(`http://localhost:8083/api/v1/products/update-product/${id}`, product);
  }

  addProduct(product: ProductBackEnd): Observable<any> {
    return this.http.post('http://localhost:8083/api/v1/products', product);
  }
}
