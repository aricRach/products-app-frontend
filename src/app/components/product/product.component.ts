import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Product} from '../../../types';
import {User} from '../../user/models/user.model';
import {CounterAction} from '../../ui/components/counter/counter-action.model';
import {CartCounterHandlerService} from '../../cart/services/cart-counter-handler.service';
import {Select} from '@ngxs/store';
import {CartState} from '../../cart/cart.state';
import {Observable} from 'rxjs';
import {CartItem} from '../../cart/models/cart-item.model';
import {IdToCartIndex} from '../../cart/models/id-to-cart-index.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() data!: Product;
  @Input() userAuthenticated: User;
  @Input() isMyProductsMode: boolean;
  @Input() idToCartIndexMap: IdToCartIndex;
  @Input() currencyCode = 'INR';
  @Input() searchTerm: string;

  @Output() btnClicked = new EventEmitter();

  @Select(CartState.getCartItems) cartItems$: Observable<Array<CartItem>> | undefined;

  constructor(private cartCounterHandlerService: CartCounterHandlerService) { }

  get isProductInCart(): boolean {
    return this.idToCartIndexMap[this.data.id] != null;
  }

  addToCartClicked(): void {
    if (this.userAuthenticated) {
      this.btnClicked.emit(this.data);
    } else {
      sessionStorage.setItem('itemToAdd', JSON.stringify(this.data));
      this.btnClicked.emit(null);
    }
  }

  counterClicked(action: CounterAction): void {
    this.cartCounterHandlerService.onCounterClicked(action);
    if (action.numberOfItems === 1 && action.actionType === 'decrease') {
    }
  }
}
