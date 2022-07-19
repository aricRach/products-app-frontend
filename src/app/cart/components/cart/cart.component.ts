import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Select} from '@ngxs/store';
import {CartState} from '../../cart.state';
import {Observable} from 'rxjs';
import {CartItem} from '../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {

  @Select(CartState.getCartItems) cartItems$: Observable<Array<CartItem>> | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
