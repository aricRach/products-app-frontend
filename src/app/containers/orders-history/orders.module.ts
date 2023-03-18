import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import {OrdersComponent} from './components/orders/orders.component';
import {OrdersApiService} from './services/orders-api.service';
import {PipesModule} from '../../pipes/pipes.module';
import {DirectivesModule} from '../../directives/directives.module';

@NgModule({
  declarations: [
    OrdersComponent
  ],
  providers: [
    OrdersApiService
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    PipesModule,
    DirectivesModule
  ]
})
export class OrdersModule { }
