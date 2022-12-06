import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../user/user.service';
import {PurchaseProduct} from '../../orders/models/purchase-product.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private userEmail: string;
  orders = [
   {name: 'a', finalPrice: 90, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH8uNPasW-3vV49JlSRN6gyWbO5MXpP5HY8BJ7dasj&s',
     date: new Date()},
   {name: 'b', finalPrice: 880.88, image: 'https://cdn.britannica.com/68/195168-050-BBAE019A/football.jpg',
     date: new Date()},
   {name: 'c', finalPrice: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH8uNPasW-3vV49JlSRN6gyWbO5MXpP5HY8BJ7dasj&s',
     date: new Date()},
  ] as PurchaseProduct[];

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.userService.getUser());
    this.userEmail = this.userService.getUser().email;
    console.log(this.userEmail);
    if (this.userEmail) {
      this.http.get(`http://localhost:8083/api/v1/user/${this.userEmail}`).subscribe((data: any) => {
        console.log(data.orders);
        this.orders = data.orders;
      });
    }
  }
}
