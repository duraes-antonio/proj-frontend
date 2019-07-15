import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {BarraBuscaComponent} from './barra-busca/barra-busca.component';
import {FormsModule} from '@angular/forms';
import {BannerComponent} from './banner/banner.component';

@NgModule({
  declarations: [NavbarComponent, BarraBuscaComponent, BannerComponent],
  exports: [
    NavbarComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ComponentesModule { }
