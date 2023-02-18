import { Injectable } from '@angular/core';
import {Product} from '../../types';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductApiService} from './product-api.service';
import {UserService} from '../user/services/user.service';

@Injectable({
  providedIn: 'root'
})
// @Injectable() // service is locally
export class ProductService {

  private dataChangedSubject = new BehaviorSubject(false);

  dataChangedObservable: Observable<boolean>;

  constructor(private productApiService: ProductApiService, private userService: UserService) {
    this.dataChangedObservable = this.dataChangedSubject.asObservable();
  }

  dataChanged(): void {
    this.dataChangedSubject.next(true);
  }

  getProducts(userEmail: string): Observable<Product[]> {
    return this.productApiService.getProducts(userEmail);
  }

  deleteProduct(id: number): Observable<any> {
    return this.productApiService.deleteProduct(id);
  }

  getMyProducts(): Observable<any> {
    return this.productApiService.getMyProducts(this.userService.getUser().email);
  }
}
