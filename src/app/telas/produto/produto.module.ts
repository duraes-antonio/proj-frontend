import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProdutoRoutingModule} from './produto-routing.module';
import {TelaVisualizarProdutoComponent} from './tela-visualizar-produto/tela-visualizar-produto.component';
import {TelaListaProdutoComponent} from './tela-lista-produto/tela-lista-produto.component';
import {ComponentesModule} from '../../componentes/componentes.module';
import {TelaGerenciaProdutoComponent} from './tela-gerencia-produto/tela-gerencia-produto.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [
    TelaListaProdutoComponent,
    TelaVisualizarProdutoComponent,
    TelaGerenciaProdutoComponent
  ],
  imports: [
    CommonModule,
    ComponentesModule,
    ProdutoRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule
  ],
  providers: [
    MatDialog,
    MatNativeDateModule
  ]
})
export class ProdutoModule {
}
