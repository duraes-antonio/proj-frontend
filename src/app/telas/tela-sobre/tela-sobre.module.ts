import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TelaSobreRoutingModule} from './tela-sobre-routing.module';
import {TelaSobreComponent} from './tela-sobre.component';
import {ComponentesModule} from '../../components/componentes.module';

@NgModule({
  declarations: [TelaSobreComponent],
  imports: [
    CommonModule,
    TelaSobreRoutingModule,
    ComponentesModule
  ]
})
export class TelaSobreModule { }
