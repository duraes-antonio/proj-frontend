import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SliderBaseComponent} from './slider-base/slider-base.component';
import {SliderMarketComponent} from './slider-market/slider-market.component';
import {SliderMasterComponent} from './slider-master/slider-master.component';
import {SliderProductComponent} from './slider-product/slider-product.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {ComponentesModule} from "../componentes.module";


@NgModule({
  declarations: [
    SliderBaseComponent,
    SliderMarketComponent,
    SliderMasterComponent,
    SliderProductComponent
  ],
  exports: [
    SliderBaseComponent,
    SliderMarketComponent,
    SliderMasterComponent,
    SliderProductComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    ComponentesModule,
  ]
})
export class SliderModule {
}
