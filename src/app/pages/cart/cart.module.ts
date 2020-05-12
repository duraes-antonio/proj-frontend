import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartComponent} from './cart.component';
import {CartRoutingModule} from './cart-routing.module';
import {ComponentesModule} from '../../components/componentes.module';
import {MatButtonModule} from '@angular/material/button';
import {CartEmptyComponent} from './cart-empty/cart-empty.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {SliderModule} from '../../components/sliders/slider.module';


@NgModule({
  declarations: [
    CartComponent,
    CartEmptyComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    ComponentesModule,
    MatButtonModule,
    NgxSpinnerModule,
    SliderModule
  ]
})
export class CartModule {
}
