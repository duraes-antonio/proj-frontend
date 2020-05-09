import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {FormBuilder, FormControl} from '@angular/forms';
import {Product} from '../../../models/product';
import {Category} from '../../../models/category';
import {productSizes} from '../../../../shared/constants/field-size';
import {getMsgFront} from '../../../../shared/validations/msgErrorFunctionsFront';
import {validators} from '../../../../shared/validations/validatorsCustom';
import {masks} from '../../../../shared/input-masks/maskFunctions';
import {CategoryService} from '../../../services/category.service';
import {getObjectFromFormGroup} from '../../../../shared/util';

@Component({
  selector: 'app-modal-product-mat',
  templateUrl: './modal-product-mat.component.html',
  styleUrls: ['./modal-product-mat.component.scss']
})
export class ModalProductMatComponent {

  readonly product?: Product = this.data.product;
  readonly textModal = {
    title: this.data.product ? this.data.product.title : 'Novo produto',
    btnAction: 'Salvar',
    btnCancel: 'Descartar',
  };

  productCategs: Category[] = [];
  freeDelivery = false;
  readonly _getMsg = getMsgFront;
  readonly _sizes = productSizes;
  readonly _controlCategory = new FormControl();

  readonly _controlTitle = new FormControl(
    this.product?.title, validators.textValidator(this._sizes.titleMax, 10)
  );
  readonly _controlDesc = new FormControl(
    this.product?.desc, validators.textValidator(this._sizes.descMax, 20)
  );
  readonly _controlCost = new FormControl(
    this.product ? +this.product.cost.toFixed(2) : null,
    validators.numberValidator(this._sizes.costMin, this._sizes.costMax, false)
  );
  readonly _controlPrice = new FormControl(
    this.product ? +this.product.price.toFixed(2) : null,
    validators.numberValidator(this._sizes.priceMin, this._sizes.priceMax, true)
  );
  readonly _controlQuantity = new FormControl(
    this.product?.quantity,
    validators.numberValidator(this._sizes.amountAvailableMin, this._sizes.amountAvailableMax, true)
  );
  readonly _controlDiscount = new FormControl(
    this.product ? +this.product.percentOff.toFixed(2) : null,
    validators.numberValidator(this._sizes.percentOffMin, this._sizes.percentOffMax, false)
  );
  readonly _controlHeight = new FormControl(
    this.product?.height,
    validators.numberValidator(this._sizes.heightMin, this._sizes.heightMax, true)
  );
  readonly _controlWidth = new FormControl(
    this.product?.width,
    validators.numberValidator(this._sizes.widthMin, this._sizes.widthMax, true)
  );
  readonly _controlLength = new FormControl(
    this.product?.length,
    validators.numberValidator(this._sizes.lengthMin, this._sizes.lengthMax, true)
  );
  readonly _controlWeight = new FormControl(
    this.product?.weight,
    validators.numberValidator(this._sizes.weightMin, this._sizes.weightMax, true)
  );
  readonly _formGroup = new FormBuilder().group({
    title: this._controlTitle,
    desc: this._controlDesc,
    cost: this._controlCost,
    price: this._controlPrice,
    quantity: this._controlQuantity,
    percentOff: this._controlDiscount,
    height: this._controlHeight,
    width: this._controlWidth,
    length: this._controlLength,
    weight: this._controlWeight,
  });

  @Output() closed = new EventEmitter();
  @Output() action = new EventEmitter<Product>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IModalProductData,
    private readonly _categoryServ: CategoryService
  ) {
    const categCheckeds: Category[] = [];
    _categoryServ.get()
      .subscribe((categories: Category[]) => {
        this.productCategs = categories;
        categories.forEach(
          c => {
            if (this.product?.categories.some(cp => c.id === cp.id)) {
              categCheckeds.push(c);
            }
          });
        this._controlCategory.setValue(categCheckeds);
      });
  }

  static getConfig(data: IModalProductData): MatDialogConfig {
    return {
      data: data,
      maxHeight: '100vh',
      maxWidth: '650px',
    };
  }

  emitProduct(product?: Product) {
    const productChanged = getObjectFromFormGroup(this._formGroup) as Product;

    if (productChanged) {
      const productUpdated = {
        ...productChanged,
        freeDelivery: this.freeDelivery,
        categoriesId: this._controlCategory.value
      };
      this.action.emit(productUpdated);
    }
  }

  formatNum(target: any) {
    if (target.value) {
      target.value = masks.numberUnsigned(target.value);
    }
  }
}

export interface IModalProductData {
  product?: Product;
}
