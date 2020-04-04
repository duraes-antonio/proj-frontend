'use strict';
import {Component} from '@angular/core';
import {Product} from '../../../models/product';
import {DataTests} from '../../../../shared/dataTests';
import {Product2Service} from '../../../services/product2.service';
import {MatDialog} from '@angular/material/dialog';
import {ModalProductMatComponent} from '../../../components/modais/modal-product-mat/modal-product-mat.component';
import {FormControl} from '@angular/forms';
import {Category} from '../../../models/category';
import {EProductSort} from '../../../models/filters/filterProductUser.model';

@Component({
  selector: 'app-tela-gerencia-produto',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent {

  readonly controlCategories = new FormControl();
  readonly optsSort: { key: EProductSort, name: string }[] = [
    {key: EProductSort.AVERAGE_REVIEW, name: 'Maior avaliação'},
    {key: EProductSort.DISCOUNTS, name: 'Maior desconto'},
    {key: EProductSort.NEWEST, name: 'Mais novos'},
    {key: EProductSort.OLDEST, name: 'Mais antigos'},
    {key: EProductSort.PRICE_HIGH, name: 'Maior preço'},
    {key: EProductSort.PRICE_LOW, name: 'Menor preço'}
  ];
  products: Product[] = DataTests.products;
  categories: Category[] = DataTests.categories;
  productChosen?: Product;
  textSearch = '';
  _window = window;

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
    this.productChosen = Product2Service.getById(id);
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
    Product2Service.put(product);
  }

  searchProduct() {

  }
}
