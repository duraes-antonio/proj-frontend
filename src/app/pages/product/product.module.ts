import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductRoutingModule} from './product-routing.module';
import {ProductDetailsComponent} from './details/product-details.component';
import {ProductListComponent} from './list/product-list.component';
import {ComponentesModule} from '../../components/componentes.module';
import {ProductManagementComponent} from './management/product-management.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SliderModule} from '../../components/sliders/slider.module';
import {MatMenuModule} from '@angular/material/menu';
import {StarRatingModule} from '../../components/star-rating/star-rating.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ReviewsEmptyComponent} from './reviews-empty/reviews-empty.component';
import {ResultEmptyComponent} from './result-empty/result-empty.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductManagementComponent,
    ReviewsEmptyComponent,
    ResultEmptyComponent
  ],
    imports: [
      CommonModule,
      ComponentesModule,
      ProductRoutingModule,
      MatDialogModule,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      FormsModule,
      MatInputModule,
      MatDatepickerModule,
      MatSelectModule,
      ReactiveFormsModule,
      MatCheckboxModule,
      SliderModule,
      MatMenuModule,
      StarRatingModule,
      NgxSpinnerModule
    ],
  exports: [
    ProductListComponent
  ],
  providers: [
    MatDialog,
    MatNativeDateModule
  ]
})
export class ProductModule {
}
