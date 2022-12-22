import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Select, Store} from '@ngxs/store';
import {CartState} from '../../../../cart/cart.state';
import {Observable, Subscription} from 'rxjs';
import {CartItem} from '../../../../cart/models/cart-item.model';
import {CurrencyService} from '../../../../currency/currency.service';
import {EmptyCart, RemoveFromCart} from '../../../../cart/cart-actions.actions';
import {CounterAction} from '../../counter/counter-action.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ProductService} from '../../../../services/product.service';
import {UserService} from '../../../../user/services/user.service';
import {Cart} from '../../../../cart/models/cart.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CartCounterHandlerService} from '../../../../cart/services/cart-counter-handler.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})
export class CartModalComponent implements OnInit, OnDestroy {

  private url = 'http://localhost:8083/api/v1/products/buy';

  currencyCode: string;
  isCartEmpty: boolean;

  subscriber = new Subscription();

  private cart: Cart;

  @Select(CartState.getCartItems) cartItems$: Observable<Array<CartItem>> | undefined;
  @Select(CartState.getCartTotalPrice) cartItemsTotalPrice$: Observable<number> | undefined;
  @Select(CartState.isCartEmpty) isCartEmpty$: Observable<boolean>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<any>,
              private currencyService: CurrencyService, private store: Store, private http: HttpClient,
              private productService: ProductService, private userService: UserService, private snackBar: MatSnackBar,
              private cartCounterHandlerService: CartCounterHandlerService) {
    this.cart = {} as Cart;
  }

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
      this.cart.cartItems = data;
    });
    this.subscriber.add(cartItemsSubscriber);
  }

  removeFromCart(item: CartItem): void {
    this.store.dispatch(new RemoveFromCart(item.id));
  }

  onCounterClicked(action: CounterAction): void {
    this.cartCounterHandlerService.onCounterClicked(action);
    if (this.isCartEmpty) {
      this.dialog.close();
    }
  }

  onApproveClicked(): any {
    this.cart.buyerEmail = this.userService.getUser().email;
    const newArr = [...this.cart.cartItems];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.cart.cartItems.length; i++) {
      // @ts-ignore
      newArr[0] = {...this.cart.cartItems[0], userOwner: {
          email: this.cart.cartItems[0].userOwner,
          userName: ''
        }};
    }
    this.cart.cartItems = newArr;
    this.http.post(this.url, this.cart).subscribe(() => {
        this.store.dispatch(new EmptyCart());
        this.productService.dataChanged();
        this.snackBar.open('purchase completed');
    }, (err: HttpErrorResponse) => {
        console.log(err.error.message);
        this.snackBar.open(err.error.message, 'close', {duration: 10000});
    });
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
