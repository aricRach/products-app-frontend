import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../types';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders = [
   {name: 'a', finalPrice: 90, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH8uNPasW-3vV49JlSRN6gyWbO5MXpP5HY8BJ7dasj&s', date: new Date()},
   {name: 'b', finalPrice: 880.88, image: 'https://cdn.britannica.com/68/195168-050-BBAE019A/football.jpg', date: new Date()},
   {name: 'c', finalPrice: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH8uNPasW-3vV49JlSRN6gyWbO5MXpP5HY8BJ7dasj&s', date: new Date()},
  ] as Product[];

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.http.get("http://localhost:8083/api/v1/user/")
  }

}
