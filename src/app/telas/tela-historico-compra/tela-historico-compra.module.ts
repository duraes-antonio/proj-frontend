import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TelaHistoricoCompraComponent} from './tela-historico-compra.component';
import {TelaHistoricoCompraRoutingModule} from './tela-historico-compra-routing.module';

@NgModule({
  declarations: [
    TelaHistoricoCompraComponent
  ],
  exports: [
    TelaHistoricoCompraComponent
  ],
  imports: [
    CommonModule,
    TelaHistoricoCompraRoutingModule
  ]
})
export class TelaHistoricoCompraModule { }
