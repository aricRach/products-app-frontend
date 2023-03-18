import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from './containers/product-list/product-list.component';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {ModelDrivenComponent} from './forms/model-driven/model-driven.component';
import {TemplateDrivenComponent} from './forms/template-driven/template-driven.component';
import {DynamicFormsComponent} from './forms/dynamic-forms/dynamic-forms.component';
import {ProductDetailComponent} from './containers/product-detail/product-detail.component';
import {LoginComponent} from './user/components/login/login.component';
import {AuthGuard} from './user/guards/auth.guard';
import {AddProductComponent} from './containers/add-product/add-product.component';
import {ExitFormGuard} from './ui/components/modals/exit-form.guard';
import {SignupComponent} from './user/components/signup/signup.component';
import {UserOwnerGuard} from './user/guards/user-owner.guard';
import {MyProductsResolver} from './resolvers/my-products.resolver';
import {ChangePasswordComponent} from './user/components/change-password/change-password.component';
import {NotLoggedInGuard} from './user/guards/not-logged-in.guard';
import {ResetPasswordComponent} from './user/components/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [NotLoggedInGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [NotLoggedInGuard]},
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [NotLoggedInGuard]},
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
  { path: 'orders', loadChildren: () => import('./containers/orders-history/orders.module').then(m => m.OrdersModule),
    canActivate: [AuthGuard]},
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
