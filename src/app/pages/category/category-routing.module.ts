import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {routesFrontend} from '../../../shared/constants/routes-frontend';
import {AdminGuard} from '../../guards/admin.guard';
import {CategoryManagementComponent} from './category-management/category-management.component';

const produtoRoutes: Routes = [
  {
    component: CategoryManagementComponent,
    canActivate: [AdminGuard],
    path: routesFrontend.categoriesManagement
  }
];

@NgModule({
  imports: [RouterModule.forChild(produtoRoutes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {
}
