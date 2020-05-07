import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from './list/product-list.component';
import {ProductDetailsComponent} from './details/product-details.component';
import {ProductManagementComponent} from './management/product-management.component';
import {routesFrontend} from '../../../shared/constants/routes-frontend';
import {AdminGuard} from '../../guards/admin.guard';

const produtoRoutes: Routes = [
  {
    component: ProductManagementComponent,
    canActivate: [AdminGuard],
    path: routesFrontend.productsManagement
  },
  {
    component: ProductListComponent,
    path: routesFrontend.productsView
  },
  {
    component: ProductDetailsComponent,
    path: routesFrontend.productView
  }
];

@NgModule({
  imports: [RouterModule.forChild(produtoRoutes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
