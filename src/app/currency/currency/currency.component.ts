import { Component, OnInit } from '@angular/core';
import {CurrencyService} from '../currency.service';
import * as currencies from '../currencies-img.json';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent {

  images = (currencies as any).default;
  codes = [
    {value: 'INR', img: this.images.INR},
    {value: 'USD', img: this.images.USD},
    {value: 'EUR', img: this.images.EUR}
    ];
  constructor(private  currencyService: CurrencyService) {}

  changeCurrency(currency: string): void {
    this.currencyService.updateCurrency(currency);
  }

}
