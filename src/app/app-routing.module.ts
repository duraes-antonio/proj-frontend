import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TelaInicialComponent} from './telas/tela-inicial/tela-inicial.component';

const routes: Routes = [
  {path: 'home', component: TelaInicialComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
