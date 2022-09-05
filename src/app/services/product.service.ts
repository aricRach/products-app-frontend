import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductType} from '../../types';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// @Injectable() // service is locally
export class ProductService {

  private url = 'https://raw.githubusercontent.com/mdmoin7/Random-Products-Json-Generator/master/products.json';

  // tslint:disable-next-line:variable-name
  _allProducts: ProductType[];

  constructor(private http: HttpClient) {
    this.setAllProducts();
  }

  get allProducts(): ProductType[] {
    return this._allProducts || [];
  }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.url);
  }

  private setAllProducts(): void {
    this.http.get<ProductType[]>(this.url).pipe(map((products: ProductType[]) => {
      return products.map((product, index) => {
        if (index % 2 === 0) {
          return {...product, discountPercent: 10 };
        }
        return product;
      });
    })).subscribe((products: ProductType[]) => {
      this._allProducts = products;
    });
  }
}
