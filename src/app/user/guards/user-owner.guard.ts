import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../services/user.service';
import {map} from 'rxjs/operators';
import {ProductApiService} from '../../services/product-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserOwnerGuard implements CanActivate {

  constructor(private userService: UserService, private productApiService: ProductApiService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.productApiService.geProductById(route.paramMap.get('pid')).pipe(map(value => {
        if (value && value.userOwner === this.userService.getUser().email) {
          route.data = {...route.data, product: value};
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      }));
  }
}
