import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TelaInicialComponent} from './tela-inicial/tela-inicial.component';
import {ComponentesModule} from '../componentes/componentes.module';
import {TelasRoutingModule} from './telas.routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    TelaInicialComponent
  ],
  exports: [
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    ComponentesModule,
    TelasRoutingModule
  ]
})
export class TelasModule {
}
