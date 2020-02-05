import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TelaCarrinhoComponent} from './tela-carrinho.component';
import {TelaCarrinhoRoutingModule} from './tela-carrinho-routing.module';
import {ComponentesModule} from '../../componentes/componentes.module';


@NgModule({
  declarations: [
    TelaCarrinhoComponent
  ],
  imports: [
    CommonModule,
    TelaCarrinhoRoutingModule,
    ComponentesModule
  ]
})
export class TelaCarrinhoModule {
}
