import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProdutoRoutingModule} from './produto-routing.module';
import {TelaVisualizarProdutoComponent} from './tela-visualizar-produto/tela-visualizar-produto.component';
import {TelaListaProdutoComponent} from './tela-lista-produto/tela-lista-produto.component';
import {ComponentesModule} from '../../components/componentes.module';
import {TelaGerenciaProdutoComponent} from './tela-gerencia-produto/tela-gerencia-produto.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {SliderModule} from '../../components/sliders/slider.module';


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
    MatDatepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    SliderModule
  ],
  exports: [
    TelaListaProdutoComponent
  ],
  providers: [
    MatDialog,
    MatNativeDateModule
  ]
})
export class ProdutoModule {
}
