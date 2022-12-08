import { Injectable } from '@angular/core';
import {Product} from '../../types';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductApiService} from './product-api.service';

@Injectable({
  providedIn: 'root'
})
// @Injectable() // service is locally
export class ProductService {

  // private url = 'https://raw.githubusercontent.com/mdmoin7/Random-Products-Json-Generator/master/products.json';
  private url = 'http://localhost:8082/api/v1/product';

  private dataChangedSubject = new BehaviorSubject(false);

  dataChangedObservable: Observable<boolean>;

  // tslint:disable-next-line:variable-name
  _allProducts: Product[];

  constructor(private productApiService: ProductApiService) {
    this.setAllProducts();
    this.dataChangedObservable = this.dataChangedSubject.asObservable();
  }

  get allProducts(): Product[] {
    return this._allProducts || [];
  }

  dataChanged(): void {
    this.dataChangedSubject.next(true);
  }

  getProducts(): Observable<Product[]> {
    return this.productApiService.getProducts();
  }

   setAllProducts(): void {
    this.productApiService.getProducts().subscribe((products: Product[]) => {
      this._allProducts = products;
    });
  }
}
