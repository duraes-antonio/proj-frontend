import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalMatComponent} from './modal-mat/modal-mat.component';
import {ModalAddressComponent} from './modal-address/modal-address.component';
import {ModalPaymentMatComponent} from './modal-payment-mat/modal-payment-mat.component';
import {ModalProductMatComponent} from './modal-product-mat/modal-product-mat.component';
import {ModalRecupSenhaComponent} from './modal-recup-senha/modal-recup-senha.component';
import {ModalShippingMatComponent} from './modal-shipping-mat/modal-shipping-mat.component';
import {MatDialog} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    ModalMatComponent,
    ModalAddressComponent,
    ModalPaymentMatComponent,
    ModalProductMatComponent,
    ModalRecupSenhaComponent,
    ModalShippingMatComponent
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
    ReactiveFormsModule
  ],
  providers: [
    MatDialog
  ]
})
export class ModalModule {
}
