import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {RouterModule} from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';

import {FiltroProdutoComponent} from './filtro-produto/filtro-produto.component';
import {FooterComponent} from './footer/footer.component';
import {InputNumberComponent} from './input/input-number/input-number.component';
import {ListaCartaoComponent} from './lista-cartao/lista-cartao.component';
import {ModalModule} from './modais/modal.module';
import {NavbarComponent} from './navbar/navbar.component';
import {PaginacaoComponent} from './paginacao/paginacao.component';
import {RatingListComponent} from './rating-list/rating-list.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {SliderModule} from './sliders/slider.module';
import {StarRatingComponent} from './star-rating/star-rating.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SearchBarComponent,
    FooterComponent,
    SidenavComponent,
    ListaCartaoComponent,
    FiltroProdutoComponent,
    PaginacaoComponent,
    StarRatingComponent,
    RatingListComponent,
    InputNumberComponent,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SidenavComponent,
    ListaCartaoComponent,
    SearchBarComponent,
    FiltroProdutoComponent,
    PaginacaoComponent,
    StarRatingComponent,
    RatingListComponent,
    InputNumberComponent,
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
    MatSidenavModule,
    ModalModule,
    SliderModule
  ],
  providers: [
    MatDialog,
    MatNativeDateModule
  ]
})
export class ComponentesModule {
}
