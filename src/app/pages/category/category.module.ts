import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryManagementComponent} from './category-management/category-management.component';
import {CategoryRoutingModule} from './category-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {ComponentesModule} from '../../components/componentes.module';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [CategoryManagementComponent],
  imports: [
    CategoryRoutingModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatIconModule,
    NgxSpinnerModule,
    MatMenuModule,
    ComponentesModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class CategoryModule {
}
