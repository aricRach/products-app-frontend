import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyComponent } from './currency/currency.component';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    CurrencyComponent
  ],
    imports: [
        CommonModule,
        MatIconModule
    ],
  exports: [
    CurrencyComponent
  ]
})
export class CurrencyModule { }
