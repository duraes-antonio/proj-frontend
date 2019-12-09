import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TelaListaProdutoComponent} from './tela-lista-produto.component';
import {TelaListaProdutoRoutingModule} from './tela-lista-produto-routing.module';


@NgModule({
  declarations: [
    TelaListaProdutoComponent
  ],
  exports: [
    TelaListaProdutoComponent
  ],
  imports: [
    CommonModule,
    TelaListaProdutoRoutingModule
  ]
})
export class TelaListaProdutoModule {
}
