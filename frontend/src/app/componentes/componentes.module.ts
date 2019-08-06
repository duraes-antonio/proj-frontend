import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {BarraBuscaComponent} from './barra-busca/barra-busca.component';
import {FormsModule} from '@angular/forms';
import {BannerComponent} from './banner/banner.component';
import {RodapeComponent} from './rodape/rodape.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {TelaInicialComponent} from './tela-inicial/tela-inicial.component';
import {SliderComponent} from './slider/slider.component';
import {SequenciaProdutoComponent} from './seq-produto/sequencia-produto.component';
import {ListaCartaoComponent} from "./lista-cartao/lista-cartao.component";

@NgModule({
  declarations: [
    NavbarComponent,
    BarraBuscaComponent,
    BannerComponent,
    RodapeComponent,
    SidenavComponent,
    TelaInicialComponent,
    SliderComponent,
    ListaCartaoComponent,
    SequenciaProdutoComponent
  ],
  exports: [
    NavbarComponent,
    BannerComponent,
    RodapeComponent,
    SidenavComponent,
    TelaInicialComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ComponentesModule {
}
