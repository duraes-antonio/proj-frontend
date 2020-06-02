import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomizationComponent} from './customization.component';
import {SliderModule} from '../../components/sliders/slider.module';
import {ProductModule} from '../product/product.module';


@NgModule({
  declarations: [CustomizationComponent],
  imports: [
    CommonModule,
    SliderModule,
    ProductModule
  ]
})
export class CustomizationModule {
}
