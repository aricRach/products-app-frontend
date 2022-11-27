import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../types';
import {BehaviorSubject, Observable} from 'rxjs';

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

  constructor(private http: HttpClient) {
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
    // this.http.get<any>('http://localhost:8082/api/v1/product').subscribe((newPr) => {
    //   console.log(newPr);
    // });
    // return this.http.get<ProductType[]>(this.url);
    return this.http.get<Product[]>(this.url);
  }

   setAllProducts(): void {
    this.http.get<Product[]>(this.url).subscribe((products: Product[]) => {
      this._allProducts = products;
    });
  }
}
