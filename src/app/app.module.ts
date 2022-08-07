import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { DiscountPipe } from './pipes/discount.pipe';
import { ConversionPipe } from './pipes/conversion.pipe';
import { TemplateDrivenComponent } from './forms/template-driven/template-driven.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ModelDrivenComponent } from './forms/model-driven/model-driven.component';
import { DynamicFormsComponent } from './forms/dynamic-forms/dynamic-forms.component';
import { ShadowEffectDirective } from './directives/shadow-effect.directive';
import { UppercaseDirective } from './directives/uppercase.directive';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProductService} from './services/product.service';
import {UiModule} from './ui/ui.module';
import { ProductDetailComponent } from './containers/product-detail/product-detail.component';
import { FilterByPipe } from './pipes/filter-by.pipe';
import {SearchModule} from './search/search.module';
import {CurrencyModule} from './currency/currency.module';
import {UserModule} from './user/user.module';
import {HttpErrorInterceptor} from './services/http-error.interceptor';
import {NgxsModule} from '@ngxs/store';
import {CartState} from './cart/cart.state';
import {PipesModule} from './pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    TemplateDrivenComponent,
    ModelDrivenComponent,
    DynamicFormsComponent,
    ShadowEffectDirective,
    UppercaseDirective,
    ErrorPageComponent,
    NumbersOnlyDirective,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    UiModule,
    SearchModule,
    CurrencyModule,
    UserModule,
    PipesModule,
    NgxsModule.forRoot([CartState]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, // interface
      useClass: HttpErrorInterceptor, // implementation
      multi: true, // allow us to work with multiple interceptors because there are already default interceptors
    },
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
