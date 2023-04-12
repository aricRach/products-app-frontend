import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../services/user.service';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // used for decision making on unauthorized users

  constructor(private userService: UserService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.userObservable.pipe(take(1), // taking only the first subscribed user data
      map((user) => !!user), // converting the user object into a boolean
      tap((isAuthenticated) => { // tapping into the data, to run a custom logic dependent on the value
      if (!isAuthenticated) {
        this.router.navigate(['/user/login'], {
          queryParams: {redirectTo: state.url}
        });
      }
      return isAuthenticated;
    }));
  }

}
