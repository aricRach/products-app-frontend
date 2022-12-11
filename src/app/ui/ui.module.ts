import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header-components/header/header.component';
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
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import {CurrencyModule} from '../currency/currency.module';
import {UserModule} from '../user/user.module';
import { NavigationBarComponent } from './components/header-components/navigation-bar/navigation-bar.component';
import { SearchComponent } from './components/header-components/search/search.component';
import { CartButtonsComponent } from './components/header-components/cart-buttons/cart-buttons.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    CartModalComponent,
    HeaderComponent,
    FooterComponent,
    CounterComponent,
    ConfirmModalComponent,
    NavigationBarComponent,
    SearchComponent,
    CartButtonsComponent,
  ],
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule, BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    PipesModule, CurrencyModule, UserModule, MatSnackBarModule
  ],
  providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}],
    exports: [
        HeaderComponent,
        FooterComponent,
        CounterComponent,
      CartModalComponent
    ]
})
export class UiModule { }
