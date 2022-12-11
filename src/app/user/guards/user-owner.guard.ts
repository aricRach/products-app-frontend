import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../services/user.service';
import {User} from '../models/user.model';
import {ProductService} from '../../services/product.service';
import {Product} from '../../../types';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserOwnerGuard implements CanActivate {

  constructor(private userService: UserService, private productService: ProductService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.userService.userObservable.pipe(map((user: User) => {
      const foundIndex = this.productService.getProductsByOwner(user.email).findIndex((product: Product) => {
        return product.id === +route.paramMap.get('pid');
      });
      if (foundIndex !== -1) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    }));
  }
}
