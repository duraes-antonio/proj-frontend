import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TelaListaProdutoComponent} from './tela-lista-produto/tela-lista-produto.component';
import {TelaVisualizarProdutoComponent} from './tela-visualizar-produto/tela-visualizar-produto.component';
import {TelaGerenciaProdutoComponent} from './tela-gerencia-produto/tela-gerencia-produto.component';
import {productsManager, productsView, productView} from '../../../shared/constants/routes';

const produtoRoutes: Routes = [
  {
    path: productsManager,
    component: TelaGerenciaProdutoComponent
  },
  {
    path: productsView,
    component: TelaListaProdutoComponent
  },
  {
    path: productView,
    component: TelaVisualizarProdutoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(produtoRoutes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule {
}
