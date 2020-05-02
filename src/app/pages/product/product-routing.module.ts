import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from './list/product-list.component';
import {ProductDetailsComponent} from './details/product-details.component';
import {ProductManagementComponent} from './management/product-management.component';
import {routesFrontend} from '../../../shared/constants/routes-frontend';

const produtoRoutes: Routes = [
  {
    path: routesFrontend.productsManagement,
    component: ProductManagementComponent
  },
  {
    path: routesFrontend.productsView,
    component: ProductListComponent
  },
  {
    path: routesFrontend.productView,
    component: ProductDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(produtoRoutes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
