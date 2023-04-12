import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from './containers/product-list/product-list.component';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {ProductDetailComponent} from './containers/product-detail/product-detail.component';
import {AuthGuard} from './user/guards/auth.guard';
import {AddProductComponent} from './containers/add-product/add-product.component';
import {ExitFormGuard} from './ui/components/modals/exit-form.guard';
import {UserOwnerGuard} from './user/guards/user-owner.guard';
import {MyProductsResolver} from './resolvers/my-products.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full'},
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  {
    path: 'products',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all-products'
      },
      {
        path: 'all-products',
        component: ProductListComponent,
        pathMatch: 'full'
      },
      {
        path: 'my-products',
        component: ProductListComponent,
        canActivate: [AuthGuard],
        data: {
          myProductMode: true
        },
        resolve: {
          productsList: MyProductsResolver
        }
      },
      {
        path: 'detail/:pid',
        component: ProductDetailComponent
      },
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
      { path: 'orders',
        loadChildren: () => import('./containers/orders-history/orders.module').then(m => m.OrdersModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  { path: '**', component: ErrorPageComponent}, // 404 route
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
