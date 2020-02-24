import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {Produto} from '../../../models/Produto';
import {Categoria} from '../../../models/Categoria';
import {DataTests} from '../../../../shared/dataTests';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-modal-product-mat',
  templateUrl: './modal-product-mat.component.html',
  styleUrls: ['./modal-product-mat.component.scss']
})
export class ModalProductMatComponent {

  readonly product: Produto = this.data.product ? this.data.product : new Produto('', '', 0);
  readonly textModal = {
    title: this.data.product ? this.data.product.titulo : 'Novo produto',
    btnAction: 'Salvar',
    btnCancel: 'Descartar',
  };
  productCategs: Categoria[] = DataTests.categorias;
  categoryControl = new FormControl();

  @Output() closed = new EventEmitter();
  @Output() action = new EventEmitter<Produto>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: IModalProductData) {
    const categCheckeds = [];
    this.productCategs.forEach(
      c => {
        if (this.product.categorias.some(cp => c.id === cp.id)) {
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
    this.product.categorias = this.categoryControl.value;
    this.action.emit(this.product);
  }
}

export interface IModalProductData {
  product?: Produto;
}
