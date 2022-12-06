import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from './containers/product-list/product-list.component';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {ModelDrivenComponent} from './forms/model-driven/model-driven.component';
import {TemplateDrivenComponent} from './forms/template-driven/template-driven.component';
import {DynamicFormsComponent} from './forms/dynamic-forms/dynamic-forms.component';
import {ProductDetailComponent} from './containers/product-detail/product-detail.component';
import {GithubSearchComponent} from './search/github-search/github-search.component';
import {LoginComponent} from './user/login/login.component';
import {AuthGuard} from './user/auth.guard';
import {AddProductComponent} from './containers/add-product/add-product.component';
import {ExitFormGuard} from './ui/components/modals/exit-form.guard';
import {OrdersComponent} from './containers/orders/orders.component';
import {SignupComponent} from './user/signup/signup.component';


const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full'},
  { path: 'github', component: GithubSearchComponent},
  { path: 'login', component: LoginComponent}, // guard not loggedin
  { path: 'signup', component: SignupComponent}, // guard not loggedin
  // { // load the order routing module --> lazy loading!
  //   path: 'orders',
  //   loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
  // },
  { path: 'products', component: ProductListComponent},
  { path: 'detail/:pid', component: ProductDetailComponent},
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  { path: 'forms', children: [
      {path: '', redirectTo: 'model', pathMatch: 'full'},
      {path: 'model', component: ModelDrivenComponent, canActivate: [AuthGuard]},
      {path: 'template', component: TemplateDrivenComponent},
      {path: 'dynamic', component: DynamicFormsComponent},
    ]},
  // 404 route
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthGuard],
    canDeactivate: [ExitFormGuard]
  },
  {
    path: 'edit-product/:pid',
    component: AddProductComponent,
    data: {
      isEditMode: true
    },
    canActivate: [AuthGuard],
    canDeactivate: [ExitFormGuard]
  },
  { path: '**', component: ErrorPageComponent},
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
