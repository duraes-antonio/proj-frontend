import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'contato',
    loadChildren: () =>
      import('./telas/tela-contato/tela-contato.module')
        .then(m => m.TelaContatoModule)
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
    path: '',
    redirectTo: 'home',
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
