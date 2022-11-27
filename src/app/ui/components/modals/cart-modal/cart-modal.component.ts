import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Select, Store} from '@ngxs/store';
import {CartState} from '../../../../cart/cart.state';
import {Observable, Subscription} from 'rxjs';
import {CartItem} from '../../../../cart/models/cart-item.model';
import {CurrencyService} from '../../../../currency/currency.service';
import {DecreaseItems, EmptyCart, IncreaseItems, RemoveFromCart} from '../../../../cart/cart-actions.actions';
import {CounterAction} from '../../counter/counter-action.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})
export class CartModalComponent implements OnInit, OnDestroy {

  private url = 'http://localhost:8082/api/v1/product/buy';

  currencyCode: string;
  isCartEmpty: boolean;

  subscriber = new Subscription();

  private cartItems: CartItem[];

  @Select(CartState.getCartItems) cartItems$: Observable<Array<CartItem>> | undefined;
  @Select(CartState.getCartTotalPrice) cartItemsTotalPrice$: Observable<number> | undefined;
  @Select(CartState.isCartEmpty) isCartEmpty$: Observable<boolean>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<any>,
              private currencyService: CurrencyService, private store: Store, private http: HttpClient) { }

  ngOnInit(): void {
    this.getCurrency();
    this.getCartStatus();
    this.getCartItems();
  }

  private getCurrency(): void {
    this.currencyService.currencyObservable.subscribe((newCode: string) => {
      this.currencyCode = newCode;
    });
  }

  private getCartStatus(): void {
    const isEmptySubscriber = this.isCartEmpty$.subscribe((isEmpty: boolean) => {
      if (isEmpty) {
        this.isCartEmpty = isEmpty;
      }
    });
    this.subscriber.add(isEmptySubscriber);
  }

  private getCartItems(): void {
    const cartItemsSubscriber = this.cartItems$.subscribe((data: CartItem[]) => {
      this.cartItems = data;
    });
    this.subscriber.add(cartItemsSubscriber);
  }

  removeFromCart(item: CartItem): void {
    this.store.dispatch(new RemoveFromCart(item.id));
  }

  onCounterClicked(action: CounterAction): void {
    if (action.actionType === 'increase') {
      this.store.dispatch(new IncreaseItems(action));
    } else {
      if (action.numberOfItems === 1) {
        this.store.dispatch(new RemoveFromCart(action.id));
        if (this.isCartEmpty) {
          this.dialog.close();
        }
      } else{
        this.store.dispatch(new DecreaseItems(action));
      }
    }
  }

  onApproveClicked(): any {
      this.http.post(this.url, this.cartItems).subscribe(() => {
        this.store.dispatch(new EmptyCart());
        // todo: invoke event in order to reload the data in products list component
    }, (err: HttpErrorResponse) => {
        console.log(err.error.message);
        // todo: create an error message
      });
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
