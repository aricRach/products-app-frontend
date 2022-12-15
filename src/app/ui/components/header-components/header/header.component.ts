import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../../user/services/user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NavigationItem} from '../models/navigation-item.model';
import {ProductService} from '../../../../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated: boolean;
  private subscriber = new Subscription();
  navs: NavigationItem[];

  constructor(public userService: UserService, private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.subscriber.add(this.userService.userObservable.subscribe(
      (user) => {
        this.isAuthenticated = !!user;
        this.setNavItems();
      }));
  }

  setNavItems(): void {
    this.navs = [
      { text: 'products', link: '/products', show: true },
      { text: 'my orders', link: '/orders', show: this.isAuthenticated },
      { text: 'add product', link: '/add-product', show: this.isAuthenticated },
      { text: 'my products', link: '/my-products', show: this.isAuthenticated },
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
