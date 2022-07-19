import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {CartModalComponent} from './cart-modal/cart-modal.component';
import {ModalsService} from './modals.service';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PipesModule} from '../../../pipes/pipes.module';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    PipesModule,
  ],
  declarations: [
    CartModalComponent
  ],
  providers: [
    ModalsService
  ],
  exports: [
    CartModalComponent
  ]
})
export class ModalsModule { }
