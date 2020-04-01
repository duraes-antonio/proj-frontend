'use strict';
import {Component} from '@angular/core';
import {Product} from '../../../models/product';
import {DataTests} from '../../../../shared/dataTests';
import {ProductService} from '../../../services/product.service';
import {MatDialog} from '@angular/material/dialog';
import {ModalProductMatComponent} from '../../../components/modais/modal-product-mat/modal-product-mat.component';
import {FormControl} from '@angular/forms';
import {Category} from '../../../models/category';
import {FilterProduct} from '../../../models/filters/filterProductAdmin.model';

@Component({
  selector: 'app-tela-gerencia-produto',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent {

  readonly controlCategories = new FormControl();
  filter = new FilterProduct();
  products: Product[] = DataTests.products;
  categories: Category[] = DataTests.categories;
  productChosen?: Product;
  textSearch = '';
  _window = window;

  /*Dados usados na tabela de produtos*/
  displayedColumns = [
    'select', 'id', 'titulo', 'porcentDesc', 'preco', 'freteGratis', 'qtdDisponivel', 'categorias'
  ];

  constructor(private _dialog: MatDialog) {
  }

  createProduct() {
    const config = ModalProductMatComponent.getConfig({});
    const dialogRef = this._dialog.open(ModalProductMatComponent, config);
    dialogRef.componentInstance.action.subscribe(
      (prod: Product) => {
        /*TODO: Persistir no banco*/
        prod.id = this.products.length + 1;
        this.products.push(prod);
      }
    );
  }

  selectProduct(id: number) {
    this.productChosen = ProductService.getById(id);
    const config = ModalProductMatComponent.getConfig({product: this.productChosen});
    const dialogRef = this._dialog.open(ModalProductMatComponent, config);
    dialogRef.componentInstance.action.subscribe(
      (prod: Product) => {
        /*TODO: Salvar produto*/
        const idxProd = this.products.findIndex(p => p.id === prod.id);

        if (idxProd > -1) {
          this.products[idxProd] = prod;
        }
      }
    );
  }

  saveProduct(product: Product) {
    ProductService.put(product);
  }

  searchProduct() {

  }
}
