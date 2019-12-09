import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Tela404Component} from './tela404.component';

const routes: Routes = [
  {
    path: '',
    component: Tela404Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tela404RoutingModule {
}
