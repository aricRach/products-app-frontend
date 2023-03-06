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
import {LoginComponent} from './user/components/login/login.component';
import {AuthGuard} from './user/guards/auth.guard';
import {AddProductComponent} from './containers/add-product/add-product.component';
import {ExitFormGuard} from './ui/components/modals/exit-form.guard';
import {OrdersComponent} from './containers/orders-history/components/orders/orders.component';
import {SignupComponent} from './user/components/signup/signup.component';
import {UserOwnerGuard} from './user/guards/user-owner.guard';
import {MyProductsResolver} from './resolvers/my-products.resolver';
import {ChangePasswordComponent} from './user/components/change-password/change-password.component';
import {NotLoggedInGuard} from './user/guards/not-logged-in.guard';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full'},
  { path: 'github', component: GithubSearchComponent},
  { path: 'login', component: LoginComponent, canActivate: [NotLoggedInGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [NotLoggedInGuard]},
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  // { // load the order routing module --> lazy loading!
  //   path: 'orders',
  //   loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
  // },
  { path: 'products', component: ProductListComponent},
  { path: 'my-products',
    component: ProductListComponent,
    canActivate: [AuthGuard],
    data: {
      myProductMode: true
    },
    resolve: {
      productsList: MyProductsResolver
    }
  },
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
    canActivate: [AuthGuard, UserOwnerGuard],
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
