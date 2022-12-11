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

  getProductsByOwner(email: string): Product[] {
    return this.allProducts.filter((product: Product) => {
      return product.userOwner.email === email;
    });
  }
}
