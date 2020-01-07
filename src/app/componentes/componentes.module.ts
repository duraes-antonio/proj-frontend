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
import {FiltroProdutoComponent} from './filtro-produto/filtro-produto.component';
import {PaginacaoComponent} from './paginacao/paginacao.component';
import {AvaliadorEstrelasComponent} from './avaliador-estrelas/avaliador-estrelas.component';
import {ListaAvaliacoesComponent} from './lista-avaliacoes/lista-avaliacoes.component';
import {ModalFreteComponent} from './modais/modal-frete/modal-frete.component';

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
    FiltroProdutoComponent,
    PaginacaoComponent,
    AvaliadorEstrelasComponent,
    ListaAvaliacoesComponent,
    ModalFreteComponent,
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
    BarraBuscaComponent,
    FiltroProdutoComponent,
    PaginacaoComponent,
    AvaliadorEstrelasComponent,
    SequenciaComponent,
    ListaAvaliacoesComponent,
    ModalFreteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ComponentesModule {
}
