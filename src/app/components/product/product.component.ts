import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Product} from '../../../types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() data!: Product;

  @Output() btnClicked = new EventEmitter();
  @Input() currencyCode = 'INR';
  @Input() searchTerm: string;

  constructor() { }

  ngOnInit(): void {}

  notifyParent(): void {
    this.btnClicked.emit(this.data);
  }
}
