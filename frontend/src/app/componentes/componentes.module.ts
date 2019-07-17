import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {BarraBuscaComponent} from './barra-busca/barra-busca.component';
import {FormsModule} from '@angular/forms';
import {BannerComponent} from './banner/banner.component';
import {RodapeComponent} from './rodape/rodape.component';

@NgModule({
  declarations: [NavbarComponent, BarraBuscaComponent, BannerComponent, RodapeComponent],
  exports: [
    NavbarComponent,
    BannerComponent,
    RodapeComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ComponentesModule { }
