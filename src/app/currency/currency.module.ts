import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyComponent } from './currency/currency.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    CurrencyComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [
    CurrencyComponent
  ]
})
export class CurrencyModule { }
