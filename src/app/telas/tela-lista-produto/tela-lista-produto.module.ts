import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TelaListaProdutoComponent} from './tela-lista-produto.component';
import {TelaListaProdutoRoutingModule} from './tela-lista-produto-routing.module';
import {ComponentesModule} from '../../componentes/componentes.module';


@NgModule({
  declarations: [
    TelaListaProdutoComponent
  ],
  exports: [
    TelaListaProdutoComponent
  ],
  imports: [
    CommonModule,
    TelaListaProdutoRoutingModule,
    ComponentesModule
  ]
})
export class TelaListaProdutoModule {
}
