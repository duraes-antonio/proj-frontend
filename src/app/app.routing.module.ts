import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'redefinir-senha',
    loadChildren: () =>
      import('./telas/tela-redefinir-senha/tela-redefinir-senha.module')
        .then(m => m.TelaRedefinirSenhaModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./telas/tela-login/tela-login.module')
        .then(m => m.TelaLoginModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
