import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../../user/services/user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NavigationItem} from '../models/navigation-item.model';
import {ProductService} from '../../../../services/product.service';
import {User} from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  authenticatedUser: User;
  private subscriber = new Subscription();
  navs: NavigationItem[];

  constructor(public userService: UserService, private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.subscriber.add(this.userService.userObservable.subscribe(
      (user) => {
        this.authenticatedUser = user;
        this.setNavItems();
      }));
  }

  setNavItems(): void {
    this.navs = [
      { text: 'products', link: '/products/all-products', show: true },
      { text: 'my orders', link: '/products/orders', show: !!this.authenticatedUser },
      { text: 'add product', link: '/products/add-product', show: !!this.authenticatedUser },
      { text: 'my products', link: '/products/my-products', show: !!this.authenticatedUser },
    ];
  }

  logout(): void {
    this.userService.clearUserSession();
    this.router.navigate(['/']);
    this.productService.dataChanged();
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
