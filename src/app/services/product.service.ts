import { Injectable } from '@angular/core';
import {Product} from '../../types';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductApiService} from './product-api.service';

@Injectable({
  providedIn: 'root'
})
// @Injectable() // service is locally
export class ProductService {

  private dataChangedSubject = new BehaviorSubject(false);

  dataChangedObservable: Observable<boolean>;

  constructor(private productApiService: ProductApiService) {
    this.dataChangedObservable = this.dataChangedSubject.asObservable();
  }

  dataChanged(): void {
    this.dataChangedSubject.next(true);
  }

  getProducts(userEmail: string): Observable<Product[]> {
    return this.productApiService.getProducts(userEmail);
  }
}
