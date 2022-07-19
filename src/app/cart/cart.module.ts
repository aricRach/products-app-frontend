import { NgModule } from '@angular/core';
import {CartComponent} from './components/cart/cart.component';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CartComponent
  ]
})
export class CartModule { }
