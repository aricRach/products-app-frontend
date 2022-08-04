import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {PipesModule} from '../pipes/pipes.module';
import {CartModalComponent} from './components/modals/cart-modal/cart-modal.component';



@NgModule({
  declarations: [
    CartModalComponent,
    HeaderComponent,
    FooterComponent,
    CounterComponent,
  ],
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule,     BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    PipesModule,
  ],
    exports: [
        HeaderComponent,
        FooterComponent,
        CounterComponent,
      CartModalComponent
    ]
})
export class UiModule { }
