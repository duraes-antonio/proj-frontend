'use strict';
import {Component} from '@angular/core';
import {Product, ProductAdd} from '../../../models/product';
import {MatDialog} from '@angular/material/dialog';
import {ModalProductMatComponent} from '../../../components/dialogs/modal-product-mat/modal-product-mat.component';
import {FormControl} from '@angular/forms';
import {Category} from '../../../models/category';
import {ProductService} from '../../../services/product.service';
import {Observable} from 'rxjs';
import {CategoryService} from '../../../services/category.service';
import {EProductSort} from '../../../enum/product-sort';

@Component({
  selector: 'app-product-management',
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
  products$: Observable<Product[]> = this._productServ.get();
  categories$: Observable<Category[]> = this._categoryServ.get();
  productChosen?: Product;
  textSearch = '';
  _window = window;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _categoryServ: CategoryService,
    private readonly _productServ: ProductService
  ) {
  }

  // TODO: Remover requisição após adicionar lógica de salvar dentro do modal
  createProduct() {
    const config = ModalProductMatComponent.getConfig({});
    const dialogRef = this._dialog.open(ModalProductMatComponent, config);
    dialogRef.componentInstance.action.subscribe(
      (prod: ProductAdd) => {
        this._productServ.post(prod);
        this.products$ = this._productServ.get();
      }
    );
  }

  // TODO: Remover requisição após adicionar lógica de salvar dentro do modal
  selectProduct(id: string) {
    this._productServ.getById(id).subscribe(p => this.productChosen = p);
    const config = ModalProductMatComponent.getConfig({product: this.productChosen});
    const dialogRef = this._dialog.open(ModalProductMatComponent, config);
    dialogRef.componentInstance.action.subscribe(
      (prodUpdated: Product) => {
        this._productServ.patch(prodUpdated);
        this.products$ = this._productServ.get();
      }
    );
  }

  // TODO: FInalizar método
  searchProduct() {

  }

  productTrackBy(index: number, item: Product): string {
    return item.id;
  }
}
