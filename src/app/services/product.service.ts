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

  // private url = 'https://raw.githubusercontent.com/mdmoin7/Random-Products-Json-Generator/master/products.json';
  private url = 'http://localhost:8082/api/v1/product';

  // tslint:disable-next-line:variable-name
  _allProducts: ProductType[];

  constructor(private http: HttpClient) {
    this.setAllProducts();
  }

  get allProducts(): ProductType[] {
    return this._allProducts || [];
  }

  getProducts(): Observable<ProductType[]> {
    // this.http.get<any>('http://localhost:8082/api/v1/product').subscribe((newPr) => {
    //   console.log(newPr);
    // });
    // return this.http.get<ProductType[]>(this.url);
    return this.http.get<ProductType[]>(this.url);
  }

   setAllProducts(): void {
    this.http.get<ProductType[]>(this.url).subscribe((products: ProductType[]) => {
      this._allProducts = products;
    });
  }
}
