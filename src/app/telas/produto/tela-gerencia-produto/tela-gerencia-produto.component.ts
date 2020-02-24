'use strict';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Produto} from '../../../models/Produto';
import {DataTests} from '../../../../shared/dataTests';
import {ProductService} from '../../../services/product.service';
import {MatDialog} from '@angular/material/dialog';
import {ModalProductMatComponent} from '../../../components/modais/modal-product-mat/modal-product-mat.component';
import {FormControl} from '@angular/forms';
import {Categoria} from '../../../models/Categoria';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';
import {FilterProduct} from '../../../models/filters/filterProduct.model';

@Component({
  selector: 'app-tela-gerencia-produto',
  templateUrl: './tela-gerencia-produto.component.html',
  styleUrls: ['./tela-gerencia-produto.component.scss']
})
export class TelaGerenciaProdutoComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  readonly controlCategories = new FormControl();
  filter = new FilterProduct();
  products: Produto[] = DataTests.produtos;
  categories: Categoria[] = DataTests.categorias;
  productChosen: Produto;
  textSearch = '';

  /*Dados usados na tabela de produtos*/
  displayedColumns = [
    'select', 'id', 'titulo', 'porcentDesc', 'preco', 'freteGratis', 'qtdDisponivel', 'categorias'
  ];
  dataSource = new MatTableDataSource<Produto>(this.products);
  selection = new SelectionModel<Produto>(true, []);

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  createProduct() {
    const config = ModalProductMatComponent.getConfig({product: null});
    const dialogRef = this.dialog.open(ModalProductMatComponent, config);
    dialogRef.componentInstance.action.subscribe(
      (prod: Produto) => {
        /*TODO: Persistir no banco*/
        prod.id = this.products.length + 1;
        this.products.push(prod);
        this.dataSource.data = this.products;
      }
    );
  }

  selectProduct(id: number) {
    this.productChosen = ProductService.getById(id);
    const config = ModalProductMatComponent.getConfig({product: this.productChosen});
    const dialogRef = this.dialog.open(ModalProductMatComponent, config);
    dialogRef.componentInstance.action.subscribe(
      (prod: Produto) => {
        const idxProd = this.products.findIndex(p => p.id === prod.id);

        if (idxProd > -1) {
          this.products[idxProd] = prod;
          this.dataSource.data = this.products;
        }
      }
    );
  }

  saveProduct(product: Produto) {
    ProductService.put(product);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
