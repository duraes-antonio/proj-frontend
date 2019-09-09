import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TelaInicialComponent} from './tela-inicial/tela-inicial.component';

const telasRoutes: Routes = [
  {path: 'home', component: TelaInicialComponent}
];

@NgModule({
  imports: [RouterModule.forChild(telasRoutes)],
  exports: [RouterModule]
})
export class TelasRoutingModule {
}
