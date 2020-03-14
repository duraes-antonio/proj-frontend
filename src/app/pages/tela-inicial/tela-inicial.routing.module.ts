import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TelaInicialComponent} from './tela-inicial.component';

const homeRoutes: Routes = [
  {path: '', component: TelaInicialComponent}
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class TelaInicialRoutingModule {
}