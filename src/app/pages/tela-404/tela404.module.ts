import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Tela404Component} from './tela404.component';
import {Tela404RoutingModule} from './tela404-routing.module';


@NgModule({
  declarations: [
    Tela404Component
  ],
  exports: [
    Tela404Component
  ],
  imports: [
    CommonModule,
    Tela404RoutingModule
  ]
})
export class Tela404Module {
}
