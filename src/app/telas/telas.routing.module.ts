import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TelaRedefinirSenhaComponent} from './tela-redefinir-senha/tela-redefinir-senha.component';
import {TelaInicialComponent} from './tela-inicial/tela-inicial.component';

const telasRoutes: Routes = [
  {path: 'redefinir-senha', component: TelaRedefinirSenhaComponent},
  {path: 'home', component: TelaInicialComponent}
];

@NgModule({
  imports: [RouterModule.forChild(telasRoutes)],
  exports: [RouterModule]
})
export class TelasRoutingModule {
}
