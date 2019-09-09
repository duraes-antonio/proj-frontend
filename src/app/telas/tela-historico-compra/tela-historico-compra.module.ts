import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TelaHistoricoCompraRoutingModule } from './tela-historico-compra-routing.module';
import { TelaHistoricoCompraComponent } from './tela-historico-compra.component';

@NgModule({
  declarations: [TelaHistoricoCompraComponent],
  imports: [
    CommonModule,
    TelaHistoricoCompraRoutingModule
  ]
})
export class TelaHistoricoCompraModule { }
