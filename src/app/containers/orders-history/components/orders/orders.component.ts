import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {UserService} from '../../../../user/services/user.service';
import {PurchaseProduct} from '../../models/purchase-product.model';
import {OrdersApiService} from '../../services/orders-api.service';
import {CurrencyService} from '../../../../currency/currency.service';
import {Observable} from 'rxjs';
import {compare, SortableHeaderDirective, SortEvent} from '../../../../directives/sortable-header.directive';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private userEmail: string;
  currencyCode$!: Observable<string>;

  originalOrders = [
   {name: 'a', finalPrice: 90, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH8uNPasW-3vV49JlSRN6gyWbO5MXpP5HY8BJ7dasj&s',
     date: new Date()},
   {name: 'b', finalPrice: 880.88, image: 'https://cdn.britannica.com/68/195168-050-BBAE019A/football.jpg',
     date: new Date()},
   {name: 'c', finalPrice: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH8uNPasW-3vV49JlSRN6gyWbO5MXpP5HY8BJ7dasj&s',
     date: new Date(2002, 2)},
  ] as PurchaseProduct[];

  orders: PurchaseProduct[];

  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

  constructor(private ordersApiService: OrdersApiService, private userService: UserService, private currencyService: CurrencyService) {
    this.currencyCode$ = this.currencyService.currencyObservable;
    this.orders = this.originalOrders;
  }

  ngOnInit(): void {
    this.userEmail = this.userService.getUser().email;
    if (this.userEmail) {
      this.ordersApiService.getOrdersHistory(this.userEmail).subscribe((data: any) => {
        this.originalOrders = data;
      });
    }
  }

  onSort({ column, direction }: SortEvent): void {
    // resetting other headers
    this.headers.forEach((header: SortableHeaderDirective) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting columns
    if (direction === '' || column === '') {
      this.orders = this.originalOrders;
    } else {
      this.orders = [...this.originalOrders].sort((a: PurchaseProduct, b: PurchaseProduct) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
