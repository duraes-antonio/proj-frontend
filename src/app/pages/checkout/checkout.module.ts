import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckoutComponent} from './checkout.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule
  ]
})
export class CheckoutModule {
}
