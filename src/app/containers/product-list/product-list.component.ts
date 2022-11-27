import {Component, OnInit} from '@angular/core';
import {Product} from '../../../types';
import {ProductService} from '../../services/product.service';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrencyService} from '../../currency/currency.service';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {AddToCart} from '../../cart/cart-actions.actions';
import {CartItem} from '../../cart/models/cart-item.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  plist: Product[] = [];
  search = new FormControl();
  selectedCode!: string;
  currencyCode$!: Observable<string>; // option 3 async pipe
  constructor(private productService: ProductService, private activeRoute: ActivatedRoute,
              private router: Router, private currencyService: CurrencyService, private store: Store) {
    this.currencyCode$ = this.currencyService.currencyObservable;   // option 3 async pipe
  }

  ngOnInit(): void {
    this.getData();
    this.watchQueryParams();
  }

  watchQueryParams(): void {
    this.activeRoute.queryParamMap.subscribe((param) => {
      param.has('search') ? this.search.setValue(param.get('search')) : this.search.setValue('');
    });
  }

  getData(): void {
      this.productService.getProducts().subscribe(
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
    console.log('add to cart', data);
    this.store.dispatch(new AddToCart(data));
  }
}
