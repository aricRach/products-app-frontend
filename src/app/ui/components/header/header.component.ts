import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {Select} from '@ngxs/store';
import {CartState} from '../../../cart/cart.state';
import {Observable} from 'rxjs';
import {CartItem} from '../../../cart/models/cart-item.model';
import {ModalsService} from '../modals/modals.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Select(CartState.getCartItems) cartItems$: Observable<Array<CartItem>> | undefined;

  navs = [
    { text: 'home', link: '/' },
    { text: 'products', link: '/products' },
    { text: 'github', link: '/github' },
    { text: 'forms', link: '/forms' },
    { text: 'orders', link: '/orders' },
    { text: 'add product', link: '/add-product' },
  ];
  search = new FormControl();

  constructor(private router: Router, private modalsService: ModalsService) {}

  ngOnInit(): void {
    this.watchValueChanges();
  }

  watchValueChanges(): void {
    this.search.valueChanges.subscribe((data: any) => {
      this.router.navigate(['/products'], { queryParams: { q: data } });
    });
  }

  goToCart(): void {
    // this.router.navigate(['cart']);
    this.modalsService.openCartModal();
  }
}
