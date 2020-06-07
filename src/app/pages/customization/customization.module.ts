import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomizationComponent} from './customization.component';
import {SliderModule} from '../../components/sliders/slider.module';
import {ProductModule} from '../product/product.module';
import {CustomListProductComponent} from './custom-list-product/custom-list-product.component';
import {MatButtonModule} from '@angular/material/button';
import {EmptyListPageComponent} from './empty-list-page/empty-list-page.component';
import {ComponentesModule} from '../../components/componentes.module';
import {ModalModule} from '../../components/dialogs/modal.module';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [CustomizationComponent, CustomListProductComponent, EmptyListPageComponent],
  imports: [
    CommonModule,
    SliderModule,
    ProductModule,
    MatButtonModule,
    ModalModule,
    ComponentesModule,
    MatIconModule
  ]
})
export class CustomizationModule {
}
