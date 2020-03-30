import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Page404Component} from './page404.component';
import {Tela404RoutingModule} from './tela404-routing.module';


@NgModule({
  declarations: [
    Page404Component
  ],
  exports: [
    Page404Component
  ],
  imports: [
    CommonModule,
    Tela404RoutingModule
  ]
})
export class Tela404Module {
}
