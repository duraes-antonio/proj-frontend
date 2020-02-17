import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {BarraBuscaComponent} from './barra-busca/barra-busca.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {StarRatingComponent} from './avaliador-estrelas/star-rating.component';
import {ListaAvaliacoesComponent} from './lista-avaliacoes/lista-avaliacoes.component';
import {ModalBaseComponent} from './modais/modal-base/modal-base.component';
import {InputNumberComponent} from './input/input-number/input-number.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ModalProductMatComponent} from './modais/modal-product-mat/modal-product-mat.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ModalMatComponent} from './modais/modal-mat/modal-mat.component';
import {ModalPaymentMatComponent} from './modais/modal-payment-mat/modal-payment-mat.component';
import {MatNativeDateModule} from '@angular/material/core';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ModalShippingMatComponent} from './modais/modal-shipping-mat/modal-shipping-mat.component';
import {ModalAddressComponent} from './modais/modal-address/modal-address.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';

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
    StarRatingComponent,
    ListaAvaliacoesComponent,
    ModalBaseComponent,
    InputNumberComponent,
    ModalProductMatComponent,
    ModalMatComponent,
    ModalPaymentMatComponent,
    ModalShippingMatComponent,
    ModalAddressComponent
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
    StarRatingComponent,
    SequenciaComponent,
    ListaAvaliacoesComponent,
    InputNumberComponent,
    ModalPaymentMatComponent,
    ModalAddressComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatCheckboxModule,
    MatDialogModule,
    ScrollingModule,
    MatRadioModule,
    MatBadgeModule,
    MatListModule,
  ],
  providers: [
    MatDialog,
    MatNativeDateModule
  ]
})
export class ComponentesModule {
}
