import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TelaSobreComponent} from './tela-sobre.component';

const routes: Routes = [
  {path: '', component: TelaSobreComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelaSobreRoutingModule {
}
