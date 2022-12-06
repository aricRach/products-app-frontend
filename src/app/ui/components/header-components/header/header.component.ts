import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  navs = [
    { text: 'products', link: '/products' },
    { text: 'github', link: '/github' },
    { text: 'forms', link: '/forms' },
    { text: 'orders', link: '/orders' },
    { text: 'add product', link: '/add-product' },
  ];

  constructor() {}

}
