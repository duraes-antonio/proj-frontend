import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TelaLoginModule} from './tela-login/tela-login.module';
import {TelaRedefinirSenhaComponent} from './tela-redefinir-senha/tela-redefinir-senha.component';
import {TelaInicialComponent} from './tela-inicial/tela-inicial.component';
import {ComponentesModule} from '../componentes/componentes.module';
import {TelasRoutingModule} from './telas.routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    TelaInicialComponent,
    TelaRedefinirSenhaComponent
  ],
  exports: [
    TelaRedefinirSenhaComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    ComponentesModule,
    TelaLoginModule,
    TelasRoutingModule
  ]
})
export class TelasModule {
}
