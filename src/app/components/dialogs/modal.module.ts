import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalMatComponent} from './modal-mat/modal-mat.component';
import {ModalAddressComponent} from './modal-address/modal-address.component';
import {ModalPaymentMatComponent} from './modal-payment-mat/modal-payment-mat.component';
import {ModalProductMatComponent} from './modal-product-mat/modal-product-mat.component';
import {ModalRecupSenhaComponent} from './modal-recup-senha/modal-recup-senha.component';
import {ModalShippingMatComponent} from './modal-shipping-mat/modal-shipping-mat.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ModalManageAddressComponent} from './modal-manage-address/modal-manage-address.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ModalManageReviewComponent} from './modal-manage-review/modal-manage-review.component';
import {StarRatingModule} from '../star-rating/star-rating.module';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    ModalMatComponent,
    ModalAddressComponent,
    ModalPaymentMatComponent,
    ModalProductMatComponent,
    ModalRecupSenhaComponent,
    ModalShippingMatComponent,
    ModalManageAddressComponent,
    ModalManageReviewComponent
  ],
  exports: [
    ModalMatComponent,
    ModalAddressComponent,
    ModalPaymentMatComponent,
    ModalProductMatComponent,
    ModalRecupSenhaComponent,
    ModalShippingMatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    ScrollingModule,
    MatAutocompleteModule,
    StarRatingModule,
    MatCheckboxModule,
  ],
  providers: [
    MatDialog
  ]
})
export class ModalModule {
}
