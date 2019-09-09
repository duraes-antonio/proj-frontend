import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TelaContatoComponent} from './tela-contato.component';

const routes: Routes = [
  {
    path: '',
    component: TelaContatoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelaContatoRoutingModule { }
