import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProdutoRoutingModule} from './telas/produto/produto-routing.module';

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
    loadChildren: './telas/tela-login/tela-login.module#TelaLoginModule'
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
    ProdutoRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
