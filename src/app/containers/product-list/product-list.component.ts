import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../../types';
import {ProductService} from '../../services/product.service';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrencyService} from '../../currency/currency.service';
import {Observable, Subscription} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {AddToCart} from '../../cart/cart-actions.actions';
import {CartItem} from '../../cart/models/cart-item.model';
import {UserService} from '../../user/services/user.service';
import {User} from '../../user/models/user.model';
import {CartState} from '../../cart/cart.state';
import {IdToCartIndex} from '../../cart/models/id-to-cart-index.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {

  plist: Product[] = [];
  search = new FormControl();
  selectedCode!: string;
  currencyCode$!: Observable<string>;
  subscriber = new Subscription();
  userAuthenticated: User;
  isMyProductsMode: boolean;
  idToCartIndexMap: IdToCartIndex;
  cartItems: CartItem[];
  isInSaleProducts: string;
  sortBy: string;
  isUpSortDirection: boolean;

  @Select(CartState.getCartItems) cartItems$: Observable<Array<CartItem>> | undefined;

  constructor(private productService: ProductService, private activeRoute: ActivatedRoute,
              private router: Router, private currencyService: CurrencyService, private store: Store, private userService: UserService) {
    this.currencyCode$ = this.currencyService.currencyObservable;
    this.plist = this.activeRoute.snapshot.data.productsList;
    this.isMyProductsMode = this.plist != null;
    this.idToCartIndexMap = {};
    this.cartItems = [];
  }

  ngOnInit(): void {
    this.subscribeUser();
    this.watchQueryParams();
    if (!this.isMyProductsMode) {
      this.subscribeDataChange();
    }
    this.subscribeToCartChanges();
  }

  private subscribeToCartChanges(): void {
    this.subscriber.add(this.cartItems$.subscribe((cartItems: CartItem[]) => {
      if (cartItems.length !== this.cartItems.length) {
        this.idToCartIndexMap = {};
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < cartItems.length; i++) {
          this.idToCartIndexMap[cartItems[i].id] = i;
        }
      }
      this.cartItems = cartItems;
    }));
  }

  private subscribeDataChange(): void {
    this.subscriber.add(this.productService.dataChangedObservable.subscribe(() => {
      this.getData();
    }));
  }
  private subscribeUser(): void {
    this.subscriber.add(this.userService.userObservable.subscribe((user: User) => {
      this.userAuthenticated = user;
    }));
  }
  private watchQueryParams(): void {
    this.subscriber.add(this.activeRoute.queryParamMap.subscribe((param) => {
      param.has('search') ? this.search.setValue(param.get('search')) : this.search.setValue('');
    }));
  }

  getData(): void {
      this.productService.getProducts(this.userAuthenticated?.email).subscribe(
        (data: Product[]) => {
          console.log('success', data);
          this.plist = data;
          console.log(this.plist);
        },
        (err: any) => {
          console.log('error', err);
        }
      );
  }

  addItem(data: CartItem): void {
    if (data) {
      console.log('add to cart', data);
      this.store.dispatch(new AddToCart(data));
    } else {
      this.router.navigate(['/login']);
    }
  }

  filterIsInSale(isInSale: boolean): void {
    this.isInSaleProducts = '' + isInSale;
  }

  onSortByChanged(sortBy: string): void {
    this.sortBy = sortBy;
  }

  onSortDirectionChanged(isUp: boolean): void {
    this.isUpSortDirection = isUp;
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
