import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TelaInicialComponent} from './componentes/telas/tela-inicial/tela-inicial.component';
import {TelaLoginComponent} from './componentes/telas/tela-login/tela-login.component';

const routes: Routes = [
  {path: 'home', component: TelaInicialComponent},
  {path: 'login', component: TelaLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
