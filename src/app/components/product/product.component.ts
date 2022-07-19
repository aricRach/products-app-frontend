import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ProductType} from '../../../types';
import {CurrencyService} from '../../currency/currency.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() data!: ProductType;

  @Output() btnClicked = new EventEmitter();
  @Input() currencyCode = 'INR';
  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    // this.currencyService.currencyObservable.subscribe((newCode: string) => {
    //   this.currencyCode = newCode;
    // });
  }

  notifyParent(): void {
    this.btnClicked.emit({
      id: this.data.productId,
      name: this.data.productName
    });
  }

  calculateDiscount(): string {
    console.log('discount calculation');
    return '50% off';
  }

}
