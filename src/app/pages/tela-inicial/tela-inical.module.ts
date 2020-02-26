import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TelaInicialRoutingModule} from './tela-inicial.routing.module';
import {TelaInicialComponent} from './tela-inicial.component';
import {ComponentesModule} from '../../components/componentes.module';
import {SliderModule} from '../../components/sliders/slider.module';

@NgModule({
  declarations: [
    TelaInicialComponent
  ],
  imports: [
    CommonModule,
    ComponentesModule,
    TelaInicialRoutingModule,
    SliderModule
  ]
})
export class TelaInicalModule {
}
