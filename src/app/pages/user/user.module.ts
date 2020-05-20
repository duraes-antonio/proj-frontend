import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserManagementComponent} from './user-management/user-management.component';
import {UserRoutingModule} from './user-routing.module';


@NgModule({
  declarations: [UserManagementComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule {
}
