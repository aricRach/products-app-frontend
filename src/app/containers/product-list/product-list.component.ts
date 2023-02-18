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
import {SortByOption} from '../../ui/components/search-filters/sort-by-option.model';
import {PageEvent} from '@angular/material/paginator';
import {FileUploadService} from '../../upload/file-upload.service';

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
  currentPageIndex = 0;
  pageSize = 5;

  @Select(CartState.getCartItems) cartItems$: Observable<Array<CartItem>> | undefined;

  sortByOptions: SortByOption[];

  constructor(private productService: ProductService, private activeRoute: ActivatedRoute,
              private router: Router, private currencyService: CurrencyService, private store: Store, private userService: UserService,
              private fileUploadService: FileUploadService) {
    this.currencyCode$ = this.currencyService.currencyObservable;
    this.idToCartIndexMap = {};
    this.cartItems = [];
    this.sortByOptions = [{alias: 'name', value: 'name'}, {alias: 'price', value: 'finalPrice'}];
  }

  ngOnInit(): void {
    this.subscribeUser();
    this.watchQueryParams();
    this.isMyProductsMode = this.activeRoute.snapshot.data.myProductMode === true;
    this.setProductList();
    this.subscribeDataChange();
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
    if (!this.isMyProductsMode ) {
      this.productService.getProducts(this.userAuthenticated?.email).subscribe(
        (data: Product[]) => {
          console.log('success', data);
          this.plist = data;
        },
        (err: any) => {
          console.log('error', err);
        }
      );
    } else {
      this.productService.getMyProducts().subscribe((data: Product[]) => {
        this.plist = data;
      });
    }
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

  onPageChanged(pageEvent: PageEvent): void {
    this.currentPageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
  }

  private setProductList(): void {
    this.plist = this.isMyProductsMode ? this.activeRoute.snapshot.data.productsList : [];
  }

  deleteProduct(product: Product): void {
    this.fileUploadService.deleteFileStorage(product.id);
    this.subscriber.add(this.productService.deleteProduct(product.id).subscribe(() => {
      console.log('product deleted');
      this.getData();
    }));
  }
}
