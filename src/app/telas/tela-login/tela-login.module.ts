import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TelaLoginComponent} from './tela-login.component';
import {TelaLoginRoutingModule} from './tela-login.routing.module';
import {FormCadClienteComponent} from './form-cad-cliente/form-cad-cliente.component';
import {FormLoginComponent} from './form-login/form-login.component';
import {ComponentesModule} from '../../componentes/componentes.module';


@NgModule({
  declarations: [
    FormCadClienteComponent,
    FormLoginComponent,
    TelaLoginComponent
  ],
  imports: [
    CommonModule,
    TelaLoginRoutingModule,
    ComponentesModule
  ]
})
export class TelaLoginModule {
}
