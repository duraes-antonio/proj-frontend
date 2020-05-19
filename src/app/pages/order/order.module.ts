import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderManagementComponent} from './order-management/order-management.component';
import {OrderRoutingModule} from './order-routing.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ReactiveFormsModule} from '@angular/forms';
import {ComponentesModule} from '../../components/componentes.module';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [OrderManagementComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    ComponentesModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule
  ]
})
export class OrderModule {
}
