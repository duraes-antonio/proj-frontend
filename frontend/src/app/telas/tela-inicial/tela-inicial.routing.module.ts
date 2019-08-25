import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TelaInicialComponent} from './tela-inicial.component';

const telaInicialRoutes: Routes = [
  {path: 'home', component: TelaInicialComponent}
];

@NgModule({
  imports: [RouterModule.forChild(telaInicialRoutes)],
  exports: [RouterModule]
})
export class TelaInicialRoutingModule {
}
