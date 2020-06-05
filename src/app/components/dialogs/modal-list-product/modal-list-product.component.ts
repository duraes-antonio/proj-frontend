import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {ListProductService} from '../../../services/lists/list-product.service';
import {Product} from '../../../models/product';
import {Sequence, SequenceAdd} from '../../../models/componentes/sequence';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {validators} from '../../../../shared/validations/validatorsCustom';
import {listSizes} from '../../../../shared/constants/field-size';
import {getMsgFront} from '../../../../shared/validations/msgErrorFunctionsFront';
import {Observable} from 'rxjs';
import {ProductService} from '../../../services/product.service';
import {ERole} from '../../../enum/roles';

@Component({
  selector: 'app-modal-list-product',
  templateUrl: './modal-list-product.component.html',
  styleUrls: ['./modal-list-product.component.scss']
})
export class ModalListProductComponent {
  @Output() closed = new EventEmitter();
  @Output() action = new EventEmitter<Sequence<Product>>();
  readonly getMsg = getMsgFront;
  readonly listSizes = listSizes;

  readonly btnActionTitle = this.data.listProduct ? 'Editar lista' : 'Criar lista';
  readonly btnCancelTitle = 'Descartar';
  readonly modalTitle = `${this.data.listProduct ? 'Edição' : 'Registro'} de lista de produtos`;

  readonly dataAdd: SequenceAdd<Product> = this.data.listProduct ?? {
    title: '',
    itemsId: [],
    items: [],
    readRole: ERole.UNKNOWN
  };
  readonly listFormGroup = new FormGroup({
    textSearch: new FormControl(''),
    title: new FormControl(
      this.data.listProduct?.title,
      validators.textValidator(listSizes.titleMax, listSizes.titleMin)
    ),
    products: new FormControl(
      this.dataAdd.itemsId, Validators.minLength(1)
    )
  });
  readonly mapProductIdInList = new Map<string, boolean>();
  products$: Observable<Product[]> = this._productServ.get();
  showProducts = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalListProductData,
    private readonly _listProductServ: ListProductService,
    private readonly _productServ: ProductService
  ) {
  }

  static getConfig(data: ModalListProductData): MatDialogConfig {
    return {
      data: data,
      maxHeight: '100vh',
      maxWidth: '650px',
    };
  }

  save() {
    this._listProductServ.post({
      title: this.listFormGroup.controls['title'].value,
      itemsId: (this.dataAdd.items as Product[]).map(p => p.id),
      readRole: this.dataAdd.readRole
    })
      .subscribe(sequence => this.action.emit(sequence));
  }

  toggleItem(list: SequenceAdd<Product>, product: Product): SequenceAdd<Product> {
    const inList = this.mapProductIdInList.get(product.id);
    if (inList) {
      const index = (list.items as Product[]).findIndex(p => p.id === product.id);
      list.items?.splice(index, 1);
      this.mapProductIdInList.set(product.id, false);
    } else {
      this.mapProductIdInList.set(product.id, true);
      list.items?.push(product);
    }
    return list;
  }
}

export interface ModalListProductData {
  listProduct?: Sequence<Product>;
}
