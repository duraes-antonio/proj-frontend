import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TelaListaProdutoComponent} from './tela-lista-produto.component';

const routes: Routes = [
  {
    path: '',
    component: TelaListaProdutoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelaListaProdutoRoutingModule {
}
