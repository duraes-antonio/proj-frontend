import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TelaHistoricoCompraComponent} from './tela-historico-compra.component';

const routes: Routes = [
  {
    path: '',
    component: TelaHistoricoCompraComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelaHistoricoCompraRoutingModule { }
