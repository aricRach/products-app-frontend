import { Component, OnInit } from '@angular/core';
import {CurrencyService} from '../currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  codes = ['INR', 'USD', 'CAD', 'GBP', 'EUR'];
  constructor(private  currencyService: CurrencyService) { }

  ngOnInit(): void {
  }

  changeCurrency(event: Event): void {
    const element = event.target as HTMLSelectElement;
    this.currencyService.updateCurrency(element.value);
  }

}
