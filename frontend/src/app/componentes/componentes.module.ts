import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {BarraBuscaComponent} from './barra-busca/barra-busca.component';
import {FormsModule} from '@angular/forms';
import {BannerComponent} from './banner/banner.component';
import {RodapeComponent} from './rodape/rodape.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {TelaInicialComponent} from './telas/tela-inicial/tela-inicial.component';
import {SliderComponent} from './slider/slider.component';
import {SequenciaProdutoComponent} from './seq-produto/sequencia-produto.component';
import {ListaCartaoComponent} from './lista-cartao/lista-cartao.component';
import {SequenciaComponent} from './sequencia/sequencia.component';
import { SeqLojaComponent } from './seq-loja/seq-loja.component';
import { TelaLoginComponent } from './telas/tela-login/tela-login.component';
import {RouterModule} from '@angular/router';
import { MenuFlutuanteComponent } from './menu-flutuante/menu-flutuante.component';

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
    SequenciaProdutoComponent,
    SequenciaComponent,
    SeqLojaComponent,
    TelaLoginComponent,
    MenuFlutuanteComponent
  ],
  exports: [
    NavbarComponent,
    BannerComponent,
    RodapeComponent,
    SidenavComponent,
    TelaInicialComponent,
    MenuFlutuanteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ComponentesModule {
}
