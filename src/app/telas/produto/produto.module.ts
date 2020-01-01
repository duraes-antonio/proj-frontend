import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProdutoRoutingModule} from './produto-routing.module';
import {TelaVisualizarProdutoComponent} from './tela-visualizar-produto/tela-visualizar-produto.component';
import {TelaListaProdutoComponent} from './tela-lista-produto/tela-lista-produto.component';
import {ComponentesModule} from '../../componentes/componentes.module';


@NgModule({
  declarations: [
    TelaListaProdutoComponent,
    TelaVisualizarProdutoComponent
  ],
  imports: [
    CommonModule,
    ComponentesModule,
    ProdutoRoutingModule
  ]
})
export class ProdutoModule {
}
