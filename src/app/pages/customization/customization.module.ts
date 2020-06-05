import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomizationComponent} from './customization.component';
import {SliderModule} from '../../components/sliders/slider.module';
import {ProductModule} from '../product/product.module';
import {CustomListProductComponent} from './custom-list-product/custom-list-product.component';
import {MatButtonModule} from '@angular/material/button';
import {EmptyListPageComponent} from './empty-list-page/empty-list-page.component';
import {ComponentesModule} from '../../components/componentes.module';


@NgModule({
  declarations: [CustomizationComponent, CustomListProductComponent, EmptyListPageComponent],
  imports: [
    CommonModule,
    SliderModule,
    ProductModule,
    MatButtonModule,
    ComponentesModule
  ]
})
export class CustomizationModule {
}
