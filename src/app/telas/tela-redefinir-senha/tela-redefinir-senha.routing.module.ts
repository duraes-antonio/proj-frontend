import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TelaRedefinirSenhaComponent} from './tela-redefinir-senha.component';

const redefinirSenhaRoutes: Routes = [
  {path: '', component: TelaRedefinirSenhaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(redefinirSenhaRoutes)],
  exports: [RouterModule]
})
export class TelaRedefinirSenhaRoutingModule {
}
