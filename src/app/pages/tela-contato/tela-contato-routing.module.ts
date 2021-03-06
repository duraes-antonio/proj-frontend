import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
export class TelaContatoRoutingModule {
}
