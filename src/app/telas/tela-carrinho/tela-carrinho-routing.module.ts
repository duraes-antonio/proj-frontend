import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TelaCarrinhoComponent} from './tela-carrinho.component';

const routes: Routes = [
  {
    path: '',
    component: TelaCarrinhoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelaCarrinhoRoutingModule {
}
