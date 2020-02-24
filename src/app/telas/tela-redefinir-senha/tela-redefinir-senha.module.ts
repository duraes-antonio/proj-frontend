import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TelaRedefinirSenhaRoutingModule} from './tela-redefinir-senha.routing.module';
import {TelaRedefinirSenhaComponent} from './tela-redefinir-senha.component';
import {FormsModule} from '@angular/forms';
import {ComponentesModule} from '../../components/componentes.module';

@NgModule({
  declarations: [
    TelaRedefinirSenhaComponent
  ],
  imports: [
    CommonModule,
    TelaRedefinirSenhaRoutingModule,
    FormsModule,
    ComponentesModule,
  ]
})
export class TelaRedefinirSenhaModule {
}
