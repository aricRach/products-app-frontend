import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../types';

@Injectable({
  providedIn: 'root'
})
export class AddProductApiService {

  constructor(private http: HttpClient) { }

  updateProduct(id: number, product: Product): Observable<any> {
    return this.http.put(`http://localhost:8083/api/v1/product/update-product/${id}`, product);
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post('http://localhost:8083/api/v1/product', product);
  }
}
