import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {routesFrontend} from '../../../shared/constants/routes-frontend';
import {AdminGuard} from '../../guards/admin.guard';
import {CategoryManagementComponent} from './category-management/category-management.component';

const categoryRoutes: Routes = [
  {
    component: CategoryManagementComponent,
    canActivate: [AdminGuard],
    path: routesFrontend.categoriesManagement
  }
];

@NgModule({
  imports: [RouterModule.forChild(categoryRoutes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {
}
