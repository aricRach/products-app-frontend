import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Select, Store} from '@ngxs/store';
import {CartState} from '../../../../cart/cart.state';
import {Observable, Subscription} from 'rxjs';
import {CartItem} from '../../../../cart/models/cart-item.model';
import {CurrencyService} from '../../../../currency/currency.service';
import {DecreaseItems, IncreaseItems, RemoveFromCart} from '../../../../cart/cart-actions.actions';
import {CounterAction} from '../../counter/counter-action.model';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})
export class CartModalComponent implements OnInit, OnDestroy {

  currencyCode: string;
  isCartEmpty: boolean;

  subscriber = new Subscription();

  @Select(CartState.getCartItems) cartItems$: Observable<Array<CartItem>> | undefined;
  @Select(CartState.getCartTotalPrice) cartItemsTotalPrice$: Observable<number> | undefined;
  @Select(CartState.isCartEmpty) isCartEmpty$: Observable<boolean>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<any>,
              private currencyService: CurrencyService, private store: Store) { }

  ngOnInit(): void {
    this.getCurrency();
    this.getCartStatus();
  }

  private getCurrency(): void {
    this.currencyService.currencyObservable.subscribe((newCode: string) => {
      this.currencyCode = newCode;
    });
  }

  private getCartStatus(): void {
    this.subscriber = this.isCartEmpty$.subscribe((isEmpty: boolean) => {
      if (isEmpty) {
        this.isCartEmpty = isEmpty;
      }
    });
  }

  removeFromCart(item: CartItem): void {
    this.store.dispatch(new RemoveFromCart(item.productId));
  }

  onCounterClicked(action: CounterAction): void {
    if (action.actionType === 'increase') {
      this.store.dispatch(new IncreaseItems(action));
    } else {
      if (action.numberOfItems === 1) {
        this.store.dispatch(new RemoveFromCart(action.productId));
        if (this.isCartEmpty) {
          this.dialog.close();
        }
      } else{
        this.store.dispatch(new DecreaseItems(action));
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
