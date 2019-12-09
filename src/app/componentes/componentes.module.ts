import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {BarraBuscaComponent} from './barra-busca/barra-busca.component';
import {FormsModule} from '@angular/forms';
import {BannerComponent} from './banner/banner.component';
import {RodapeComponent} from './rodape/rodape.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {SliderComponent} from './slider/slider.component';
import {SequenciaProdutoComponent} from './seq-produto/sequencia-produto.component';
import {ListaCartaoComponent} from './lista-cartao/lista-cartao.component';
import {SequenciaComponent} from './sequencia/sequencia.component';
import {SeqLojaComponent} from './seq-loja/seq-loja.component';
import {MenuFlutuanteComponent} from './menu-flutuante/menu-flutuante.component';
import {RouterModule} from '@angular/router';
import {ModalComponent} from './modais/modal/modal.component';
import {ModalRecupSenhaComponent} from './modais/modal-recup-senha/modal-recup-senha.component';
import {PaginaFundoComponent} from './pagina-fundo/pagina-fundo.component';

@NgModule({
  declarations: [
    NavbarComponent,
    BarraBuscaComponent,
    BannerComponent,
    RodapeComponent,
    SidenavComponent,
    SliderComponent,
    ListaCartaoComponent,
    SequenciaProdutoComponent,
    SequenciaComponent,
    SeqLojaComponent,
    MenuFlutuanteComponent,
    ModalComponent,
    ModalRecupSenhaComponent,
    PaginaFundoComponent,
  ],
  exports: [
    NavbarComponent,
    BannerComponent,
    RodapeComponent,
    SidenavComponent,
    MenuFlutuanteComponent,
    ListaCartaoComponent,
    SliderComponent,
    SequenciaProdutoComponent,
    SeqLojaComponent,
    ModalComponent,
    ModalRecupSenhaComponent,
    PaginaFundoComponent,
    BarraBuscaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ComponentesModule {
}
