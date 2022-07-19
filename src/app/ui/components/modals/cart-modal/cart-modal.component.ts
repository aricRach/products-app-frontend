import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Select} from '@ngxs/store';
import {CartState} from '../../../../cart/cart.state';
import {Observable} from 'rxjs';
import {CartItem} from '../../../../cart/models/cart-item.model';
import {CurrencyService} from '../../../../currency/currency.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})
export class CartModalComponent implements OnInit {

  currencyCode: string;
  @Select(CartState.getCartItems) cartItems$: Observable<Array<CartItem>> | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private currencyService: CurrencyService) { }


  ngOnInit(): void {
    this.currencyService.currencyObservable.subscribe((newCode: string) => {
      this.currencyCode = newCode;
    });
  }

}
