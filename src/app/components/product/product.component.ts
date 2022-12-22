import {Component, Input, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Product} from '../../../types';
import {User} from '../../user/models/user.model';
import {CounterAction} from '../../ui/components/counter/counter-action.model';
import {CartCounterHandlerService} from '../../cart/services/cart-counter-handler.service';
import {Select} from '@ngxs/store';
import {CartState} from '../../cart/cart.state';
import {Observable, Subscription} from 'rxjs';
import {CartItem} from '../../cart/models/cart-item.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  @Input() data!: Product;
  @Input() userAuthenticated: User;
  @Input() isMyProductsMode: boolean;
  isProductInCart: boolean;
  cartIndex: number;
  subscription = new Subscription();

  @Output() btnClicked = new EventEmitter();
  @Input() currencyCode = 'INR';
  @Input() searchTerm: string;

  @Select(CartState.getCartItems) cartItems$: Observable<Array<CartItem>> | undefined;

  constructor(private cartCounterHandlerService: CartCounterHandlerService) { }

  ngOnInit(): void {
    this.subscription.add(this.cartItems$.subscribe((cartItems: CartItem[]) => {
      this.cartIndex = cartItems.findIndex((cartItem: CartItem) => {
        if (cartItem.id === this.data.id) {
          this.isProductInCart = true;
          return true;
        }
        return false;
      });
    }));
  }

  addToCartClicked(): void {
    if (this.userAuthenticated) {
      this.isProductInCart = true;
      this.btnClicked.emit(this.data);
    } else {
      sessionStorage.setItem('itemToAdd', JSON.stringify(this.data));
      this.btnClicked.emit(null);
    }
  }

  counterClicked(action: CounterAction): void {
    this.cartCounterHandlerService.onCounterClicked(action);
    if (action.numberOfItems === 1 && action.actionType === 'decrease') {
      this.isProductInCart = false;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
