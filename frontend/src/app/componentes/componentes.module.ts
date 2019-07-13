import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {BarraBuscaComponent} from './barra-busca/barra-busca.component';

@NgModule({
  declarations: [NavbarComponent, BarraBuscaComponent],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentesModule { }
