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
import {extractPatchFromFormGroup, getObjectFromFormGroup} from '../../../../shared/util';
import {ProductService} from '../../../services/product.service';
import {HttpEventType} from '@angular/common/http';
import {Observable} from 'rxjs';

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

  categories$: Observable<Category[]>;
  freeDelivery = false;
  percentUpload = 0;
  uploadingImage = false;
  imageTemp?: File;
  urlImageTemp?: string = this.product?.urlMainImage;
  readonly _getMsg = getMsgFront;
  readonly _sizes = productSizes;
  readonly _controlCategory = new FormControl();
  readonly _formGroup = new FormBuilder().group({
    title: new FormControl(
      this.product?.title, validators.textValidator(this._sizes.titleMax, 10)
    ),
    desc: new FormControl(
      this.product?.desc, validators.textValidator(this._sizes.descMax, 20)
    ),
    cost: new FormControl(
      this.product ? +this.product.cost.toFixed(2) : null,
      validators.numberValidator(this._sizes.costMin, this._sizes.costMax, false)
    ),
    price: new FormControl(
      this.product ? +this.product.price.toFixed(2) : null,
      validators.numberValidator(this._sizes.priceMin, this._sizes.priceMax, true)
    ),
    quantity: new FormControl(
      this.product?.quantity,
      validators.numberValidator(this._sizes.amountAvailableMin, this._sizes.amountAvailableMax, true)
    ),
    percentOff: new FormControl(
      this.product ? +this.product.percentOff.toFixed(2) : null,
      validators.numberValidator(this._sizes.percentOffMin, this._sizes.percentOffMax, false)
    ),
    height: new FormControl(
      this.product?.height,
      validators.numberValidator(this._sizes.heightMin, this._sizes.heightMax, true)
    ),
    width: new FormControl(
      this.product?.width,
      validators.numberValidator(this._sizes.widthMin, this._sizes.widthMax, true)
    ),
    length: new FormControl(
      this.product?.length,
      validators.numberValidator(this._sizes.lengthMin, this._sizes.lengthMax, true)
    ),
    weight: new FormControl(
      this.product?.weight,
      validators.numberValidator(this._sizes.weightMin, this._sizes.weightMax, true)
    )
  });

  @Output() closed = new EventEmitter();
  @Output() action = new EventEmitter<Product>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IModalProductData,
    private readonly _categoryServ: CategoryService,
    private readonly _productServ: ProductService
  ) {
    this.categories$ = _categoryServ.get();
    this._controlCategory.setValue(this.product?.categories);
  }

  static getConfig(data: IModalProductData): MatDialogConfig {
    return {
      data: data,
      maxHeight: '100vh',
      maxWidth: '650px',
    };
  }

  _emitProduct(product?: Product) {

    let productChanged;

    if (product) {
      productChanged = extractPatchFromFormGroup(product ?? {}, this._formGroup);
    } else {
      productChanged = getObjectFromFormGroup(this._formGroup);
    }

    if (productChanged) {
      const productUpdated = {
        ...productChanged,
        categoriesId: (this._controlCategory.value as Category[]).map(c => c.id),
        freeDelivery: this.freeDelivery,
        urlMainImage: this.urlImageTemp
      } as Product;
      this.action.emit(productUpdated);
    }
  }

  formatNum(target: any) {
    if (target.value) {
      target.value = masks.numberUnsigned(target.value);
    }
  }

  previewImage(event: Event) {
    const files = (event.target as HTMLInputElement).files;

    if (files?.length) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => this.urlImageTemp = fileReader.result as string;
      fileReader.readAsDataURL(files[0]);
      this.imageTemp = files[0];
    }
  }

  emitProduct(product?: Product) {
    if (this.imageTemp) {
      this.uploadingImage = true;
      this._productServ.uploadTempImage(this.imageTemp)
        .subscribe(
          (eventHttp) => {
            if (eventHttp.type === HttpEventType.UploadProgress) {
              this.percentUpload = eventHttp.loaded / (this.imageTemp as File).size * 100;
            } else if (eventHttp.type === HttpEventType.Response) {
              this.urlImageTemp = eventHttp?.body?.data;
              this.uploadingImage = false;
              this.percentUpload = 0;
              setTimeout(() => this._emitProduct(product), 500);
            }
          });
    } else {
      this._emitProduct(product);
    }
  }

  cmpCategory(a: Category, b: Category): boolean {
    return a.id === b.id;
  }
}

export interface IModalProductData {
  product?: Product;
}
