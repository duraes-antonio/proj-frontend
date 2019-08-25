import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TelaLoginModule} from './tela-login/tela-login.module';
import {TelaInicialModule} from './tela-inicial/tela-inicial.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TelaInicialModule,
    TelaLoginModule
  ]
})
export class TelasModule {
}
