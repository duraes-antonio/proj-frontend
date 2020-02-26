import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Product} from '../../../models/product';
import {Category} from '../../../models/category';
import {DataTests} from '../../../../shared/dataTests';

@Component({
  selector: 'app-modal-product-mat',
  templateUrl: './modal-product-mat.component.html',
  styleUrls: ['./modal-product-mat.component.scss']
})
export class ModalProductMatComponent {

  readonly product: Product = this.data.product ? this.data.product : new Product('', '', 0);
  readonly textModal = {
    title: this.data.product ? this.data.product.title : 'Novo produto',
    btnAction: 'Salvar',
    btnCancel: 'Descartar',
  };
  productCategs: Category[] = DataTests.categories;
  categoryControl = new FormControl();

  @Output() closed = new EventEmitter();
  @Output() action = new EventEmitter<Product>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: IModalProductData) {
    const categCheckeds: Category[] = [];
    this.productCategs.forEach(
      c => {
        if (this.product.categories.some(cp => c.id === cp.id)) {
          categCheckeds.push(c);
        }
      }
    );
    this.categoryControl.setValue(categCheckeds);
  }

  static getConfig(data: IModalProductData): MatDialogConfig<any> {
    return {
      data: data,
      maxHeight: '100vh',
      maxWidth: '650px',
    };
  }

  emitProduct() {
    this.product.categories = this.categoryControl.value;
    this.action.emit(this.product);
  }
}

export interface IModalProductData {
  product?: Product;
}
