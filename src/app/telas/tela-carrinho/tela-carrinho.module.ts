import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TelaCarrinhoComponent} from './tela-carrinho.component';
import {TelaCarrinhoRoutingModule} from './tela-carrinho-routing.module';
import {ComponentesModule} from '../../components/componentes.module';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    TelaCarrinhoComponent
  ],
  imports: [
    CommonModule,
    TelaCarrinhoRoutingModule,
    ComponentesModule,
    MatButtonModule
  ]
})
export class TelaCarrinhoModule {
}
