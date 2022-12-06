import { Component } from '@angular/core';
import {Select} from '@ngxs/store';
import {CartState} from '../../../../cart/cart.state';
import {Observable} from 'rxjs';
import {CartItem} from '../../../../cart/models/cart-item.model';
import {ModalsService} from '../../modals/modals.service';

@Component({
  selector: 'app-cart-buttons',
  templateUrl: './cart-buttons.component.html',
  styleUrls: ['./cart-buttons.component.css']
})
export class CartButtonsComponent {

  @Select(CartState.getCartItems) cartItems$: Observable<Array<CartItem>> | undefined;

  constructor(private modalsService: ModalsService) { }

  goToCart(): void {
    this.modalsService.openCartModal();
  }
}
