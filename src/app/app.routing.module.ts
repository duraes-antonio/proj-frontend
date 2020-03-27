import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {ProdutoRoutingModule} from './pages/product/produto-routing.module';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'contato',
    loadChildren: () =>
      import('./pages/tela-contato/tela-contato.module')
        .then(m => m.TelaContatoModule)
  },
  {
    path: 'carrinho',
    loadChildren: () =>
      import('./pages/tela-carrinho/tela-carrinho.module')
        .then(m => m.TelaCarrinhoModule)
  },
  {
    path: 'historico-compra',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/tela-historico-compra/tela-historico-compra.module')
        .then(m => m.TelaHistoricoCompraModule)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/tela-inicial/tela-inical.module')
        .then(m => m.TelaInicalModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/tela-login/tela-login.module')
      .then(m => m.TelaLoginModule)
  },
  {
    path: 'redefinir-senha',
    loadChildren: () =>
      import('./pages/tela-redefinir-senha/tela-redefinir-senha.module')
        .then(m => m.TelaRedefinirSenhaModule)
  },
  {
    path: 'sobre',
    loadChildren: () =>
      import('./pages/tela-sobre/tela-sobre.module')
        .then(m => m.TelaSobreModule)
  },
  {
    path: '404',
    loadChildren: () =>
      import('./pages/tela-404/tela404.module')
        .then(m => m.Tela404Module)
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];

const extraOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled'
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, extraOptions),
    ProdutoRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
