import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Product} from '../../../types';
import {User} from '../../user/models/user.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() data!: Product;
  @Input() userAuthenticated: User;

  @Output() btnClicked = new EventEmitter();
  @Input() currencyCode = 'INR';
  @Input() searchTerm: string;

  constructor() { }

  ngOnInit(): void {}

  notifyParent(): void {
    this.btnClicked.emit(this.data);
  }
}
