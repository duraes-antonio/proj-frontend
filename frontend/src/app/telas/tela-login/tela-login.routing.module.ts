import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TelaLoginComponent} from './tela-login.component';
import {FormLoginComponent} from './form-login/form-login.component';
import {FormCadClienteComponent} from './form-cad-cliente/form-cad-cliente.component';

const telaLoginRoutes: Routes = [
  {path: 'login', component: TelaLoginComponent, children: [
      {path: 'entrar', component: FormLoginComponent},
      {path: 'cadastrar', component: FormCadClienteComponent},
      {path: '', component: FormLoginComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(telaLoginRoutes)],
  exports: [RouterModule]
})
export class TelaLoginRoutingModule {
}
