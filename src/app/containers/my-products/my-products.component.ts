import { Component, OnInit } from '@angular/core';
import {ProductApiService} from '../../services/product-api.service';
import {Product} from '../../../types';
import {UserService} from '../../user/services/user.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  products: Product[];
  constructor(private productApiService: ProductApiService, private userService: UserService) { }

  ngOnInit(): void {
    this.setProducts(this.userService.getUser().email);
  }

  private setProducts(email: string): void {
    this.productApiService.getMyProducts(email).subscribe((products: Product[]) => {
      this.products = products;
    });
  }
}
