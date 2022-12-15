import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {ProductApiService} from '../services/product-api.service';
import {UserService} from '../user/services/user.service';
import {Product} from '../../types';

@Injectable({
  providedIn: 'root'
})
export class MyProductsResolver implements Resolve<Product[]> {

  constructor(private productApiService: ProductApiService, private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
     return this.productApiService.getMyProducts(this.userService.getUser().email);
  }
}
