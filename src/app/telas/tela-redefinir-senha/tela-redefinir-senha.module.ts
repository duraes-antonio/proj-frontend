import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TelaRedefinirSenhaRoutingModule} from './tela-redefinir-senha.routing.module';
import {ComponentesModule} from '../../componentes/componentes.module';
import {TelaRedefinirSenhaComponent} from './tela-redefinir-senha.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    TelaRedefinirSenhaComponent
  ],
  imports: [
    CommonModule,
    TelaRedefinirSenhaRoutingModule,
    ComponentesModule,
    FormsModule
  ]
})
export class TelaRedefinirSenhaModule {
}
