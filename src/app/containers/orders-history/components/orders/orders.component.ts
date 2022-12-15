import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../user/services/user.service';
import {PurchaseProduct} from '../../models/purchase-product.model';
import {OrdersApiService} from '../../services/orders-api.service';
import {CurrencyService} from '../../../../currency/currency.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private userEmail: string;
  currencyCode$!: Observable<string>; // option 3 async pipe

  orders = [
   {name: 'a', finalPrice: 90, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH8uNPasW-3vV49JlSRN6gyWbO5MXpP5HY8BJ7dasj&s',
     date: new Date()},
   {name: 'b', finalPrice: 880.88, image: 'https://cdn.britannica.com/68/195168-050-BBAE019A/football.jpg',
     date: new Date()},
   {name: 'c', finalPrice: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH8uNPasW-3vV49JlSRN6gyWbO5MXpP5HY8BJ7dasj&s',
     date: new Date()},
  ] as PurchaseProduct[];


  constructor(private ordersApiService: OrdersApiService, private userService: UserService, private currencyService: CurrencyService) {
    this.currencyCode$ = this.currencyService.currencyObservable;   // option 3 async pipe
  }

  ngOnInit(): void {
    this.userEmail = this.userService.getUser().email;
    if (this.userEmail) {
      this.ordersApiService.getOrdersHistory(this.userEmail).subscribe((data: any) => {
        this.orders = data;
      });
    }
  }
}
