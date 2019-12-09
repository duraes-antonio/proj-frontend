import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'contato',
    loadChildren: () =>
      import('./telas/tela-contato/tela-contato.module')
        .then(m => m.TelaContatoModule)
  },
  {
    path: 'historico-compra',
    loadChildren: () =>
      import('./telas/tela-historico-compra/tela-historico-compra.module')
        .then(m => m.TelaHistoricoCompraModule)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./telas/tela-inicial/tela-inical.module')
        .then(m => m.TelaInicalModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./telas/tela-login/tela-login.module')
        .then(m => m.TelaLoginModule)
  },
  {
    path: 'produto',
    loadChildren: () =>
      import('./telas/tela-lista-produto/tela-lista-produto.module')
        .then(m => m.TelaListaProdutoModule)
  },
  {
    path: 'redefinir-senha',
    loadChildren: () =>
      import('./telas/tela-redefinir-senha/tela-redefinir-senha.module')
        .then(m => m.TelaRedefinirSenhaModule)
  },
  {
    path: 'sobre',
    loadChildren: () =>
      import('./telas/tela-sobre/tela-sobre.module')
        .then(m => m.TelaSobreModule)
  },
  {
    path: '404',
    loadChildren: () =>
      import('./telas/tela-404/tela404.module')
        .then(m => m.Tela404Module)
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
