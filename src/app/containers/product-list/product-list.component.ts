import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from '../../../types';
import {ProductService} from '../../services/product.service';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrencyService} from '../../currency/currency.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngxs/store';
import {AddToCart} from '../../cart/cart-actions.actions';
import {CartItem} from '../../cart/models/cart-item.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit, OnDestroy {

  plist: ProductType[] = [];
  search = new FormControl();
  selectedCode!: string;
  currency$!: Subscription;
  // currencyCode$!: Observable<string>; // option 3 async pipe
  constructor(private productService: ProductService, private activeRoute: ActivatedRoute,
              private router: Router, private currencyService: CurrencyService, private store: Store) {
    // this.currencyCode$ = this.currencyService.currencyObservable;   // option 3 async pipe
  }

  ngOnInit(): void {
    this.getData();
    this.watchValuesChanges();
    this.watchQueryParams();
    this.getCode(); // option 2
  }

  getCode(): void { // option 2
    this.currency$ = this.currencyService.currencyObservable.subscribe((newCode: string) => {
      this.selectedCode = newCode;
    });
  }

  watchValuesChanges(): void { // hot observable
    this.search.valueChanges.subscribe((data) => {
      this.router.navigate(['products'], {queryParams: {a: data}});
      console.log(data);
    });
  }

  watchQueryParams(): void {
    this.activeRoute.queryParamMap.subscribe((param) => {
      if (param.has('q')) {
        this.search.setValue(param.get('q'));
      }
    });
  }

  getData(): void {
    if (this.productService._allProducts) {
      this.plist = this.productService._allProducts;
    } else {
      this.productService.getProducts().subscribe(
        (data: ProductType[]) => {
          data.map((product, index) => {
            if (index % 2 === 0) {
              // @ts-ignore
              product.discountPercent = 10;
              return product;
            }
            return product;
          });
          console.log('success', data);
          this.plist = data;
          console.log(this.plist);
        },
        (err: any) => {
          console.log('error', err);
        }
      );
    }
  }

  addItem(data: CartItem): void {
    console.log('add to cart', data);
    this.store.dispatch(new AddToCart(data));
  }

  ngOnDestroy(): void { // option 2
    this.currency$.unsubscribe();
  }
}
