import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserManagementComponent} from './user-management/user-management.component';
import {UserRoutingModule} from './user-routing.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ComponentesModule} from '../../components/componentes.module';


@NgModule({
  declarations: [UserManagementComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxSpinnerModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    ComponentesModule
  ]
})
export class UserModule {
}
