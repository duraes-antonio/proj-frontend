import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {routesFrontend} from '../../../shared/constants/routes-frontend';
import {AdminGuard} from '../../guards/admin.guard';
import {OrderManagementComponent} from './order-management/order-management.component';

const orderRoutes: Routes = [
  {
    component: OrderManagementComponent,
    canActivate: [AdminGuard],
    path: routesFrontend.ordersManagement
  }
];

@NgModule({
  imports: [RouterModule.forChild(orderRoutes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}
