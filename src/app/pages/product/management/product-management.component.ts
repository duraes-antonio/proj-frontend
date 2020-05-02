'use strict';
import {Component} from '@angular/core';
import {Product, ProductAdd} from '../../../models/product';
import {MatDialog} from '@angular/material/dialog';
import {ModalProductMatComponent} from '../../../components/dialogs/modal-product-mat/modal-product-mat.component';
import {FormControl} from '@angular/forms';
import {Category} from '../../../models/category';
import {ProductService} from '../../../services/product.service';
import {forkJoin, Observable} from 'rxjs';
import {CategoryService} from '../../../services/category.service';
import {EProductSort} from '../../../enum/product-sort';
import {take} from 'rxjs/operators';
import {FilterProduct} from '../../../models/filters/filter-product';

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
  readonly filter: FilterProduct = {perPage: 15, currentPage: 1};
  products$: Observable<Product[]> = this._productServ.get();
  categories$: Observable<Category[]> = this._categoryServ.get();
  textSearch = '';
  countProductReturned = 0;
  _window = window;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _categoryServ: CategoryService,
    private readonly _productServ: ProductService
  ) {
    this._productServ.getCount(this.filter)
      .subscribe((count: number) => this.countProductReturned = count);
  }

  // TODO: Remover requisição após adicionar lógica de salvar dentro do modal
  createProduct() {
    const config = ModalProductMatComponent.getConfig({});
    const dialogRef = this._dialog.open(ModalProductMatComponent, config);
    dialogRef.componentInstance.action.subscribe(
      (prod: ProductAdd) => {
        const productPost$ = this._productServ.post(prod);
        this.products$ = this._productServ.get();
        forkJoin([productPost$, this.products$])
          .pipe(take(1))
          .subscribe();
      }
    );
  }

  // TODO: Remover requisição após adicionar lógica de salvar dentro do modal
  selectProduct(id: string) {
    this._productServ.getById(id).subscribe(p => {
      const config = ModalProductMatComponent.getConfig({product: p});
      const dialogRef = this._dialog.open(ModalProductMatComponent, config);
      dialogRef.componentInstance.action
        .pipe(take(1))
        .subscribe(
          (prodUpdated: Product) => {
            this._productServ.patch(id, prodUpdated)
              .subscribe(() => this.products$ = this._productServ.get());
          }
        );
    });
  }

  // TODO: FInalizar método
  searchProduct() {

  }

  productTrackBy(index: number, item: Product): string {
    return item.id;
  }

  deleteProduct(id: string) {
    this._productServ.delete(id).subscribe(() => {
      this.products$ = this._productServ.get();
    });
  }

  toggleVisibility(id: string, visible: boolean) {
    this._productServ.toggleVisibility(id, visible)
      .subscribe(() => {
        this.products$ = this._productServ.get();
      });
  }
}
