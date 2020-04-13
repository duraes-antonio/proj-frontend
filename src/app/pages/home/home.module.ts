import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {ComponentesModule} from '../../components/componentes.module';
import {SliderModule} from '../../components/sliders/slider.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ComponentesModule,
    HomeRoutingModule,
    SliderModule
  ]
})
export class HomeModule {
}
