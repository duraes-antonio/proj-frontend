import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TelaContatoRoutingModule} from './tela-contato-routing.module';
import {TelaContatoComponent} from './tela-contato.component';
import {ComponentesModule} from '../../components/componentes.module';

@NgModule({
  declarations: [TelaContatoComponent],
  imports: [
    CommonModule,
    TelaContatoRoutingModule,
    ComponentesModule
  ]
})
export class TelaContatoModule {
}
