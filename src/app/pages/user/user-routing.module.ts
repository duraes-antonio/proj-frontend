import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {routesFrontend} from '../../../shared/constants/routes-frontend';
import {AdminGuard} from '../../guards/admin.guard';
import {UserManagementComponent} from './user-management/user-management.component';

const userRoutes: Routes = [
  {
    component: UserManagementComponent,
    canActivate: [AdminGuard],
    path: routesFrontend.usersManagement
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
