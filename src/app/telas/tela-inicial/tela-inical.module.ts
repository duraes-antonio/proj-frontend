import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TelaInicialRoutingModule} from './tela-inicial.routing.module';
import {TelaInicialComponent} from './tela-inicial.component';
import {ComponentesModule} from '../../componentes/componentes.module';

@NgModule({
  declarations: [
    TelaInicialComponent
  ],
  imports: [
    CommonModule,
    ComponentesModule,
    TelaInicialRoutingModule
  ]
})
export class TelaInicalModule {
}
