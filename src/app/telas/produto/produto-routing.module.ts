import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TelaListaProdutoComponent} from './tela-lista-produto/tela-lista-produto.component';
import {TelaVisualizarProdutoComponent} from './tela-visualizar-produto/tela-visualizar-produto.component';
import {TelaGerenciaProdutoComponent} from './tela-gerencia-produto/tela-gerencia-produto.component';
import {routes} from '../../../shared/constants/routes';

const produtoRoutes: Routes = [
  {
    path: routes.productsManager,
    component: TelaGerenciaProdutoComponent
  },
  {
    path: routes.productsView,
    component: TelaListaProdutoComponent
  },
  {
    path: routes.productView,
    component: TelaVisualizarProdutoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(produtoRoutes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule {
}
