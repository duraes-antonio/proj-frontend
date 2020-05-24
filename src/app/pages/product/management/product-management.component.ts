'use strict';
import {Component} from '@angular/core';
import {Product, ProductAdd} from '../../../models/product';
import {MatDialog} from '@angular/material/dialog';
import {ModalProductMatComponent} from '../../../components/dialogs/modal-product-mat/modal-product-mat.component';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {Category} from '../../../models/category';
import {ProductService} from '../../../services/product.service';
import {forkJoin, Observable} from 'rxjs';
import {CategoryService} from '../../../services/category.service';
import {EProductSort} from '../../../enum/product-sort';
import {debounceTime, distinctUntilChanged, filter, switchMap, take} from 'rxjs/operators';
import {FilterProduct, FilterProductResponse} from '../../../models/filters/filter-product';
import {productSizes} from '../../../../shared/constants/field-size';
import {validators} from '../../../../shared/validations/validatorsCustom';
import {masks} from '../../../../shared/input-masks/maskFunctions';
import {getMsgFront} from '../../../../shared/validations/msgErrorFunctionsFront';
import * as _moment from 'moment';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent {

  readonly optsSort: { key: EProductSort, name: string }[] = [
    {key: EProductSort.AVERAGE_REVIEW, name: 'Maior avaliação'},
    {key: EProductSort.DISCOUNTS, name: 'Maior desconto'},
    {key: EProductSort.NEWEST, name: 'Mais novos'},
    {key: EProductSort.OLDEST, name: 'Mais antigos'},
    {key: EProductSort.PRICE_HIGH, name: 'Maior preço'},
    {key: EProductSort.PRICE_LOW, name: 'Menor preço'}
  ];
  readonly filter: FilterProduct = {perPage: 15, currentPage: 1};
  readonly sizes = productSizes;
  readonly formGroup = new FormGroup({
    categories: new FormControl([]),
    dateStart: new FormControl(null, validators.dateValidator(false)),
    dateEnd: new FormControl(null, validators.dateValidator(false)),
    text: new FormControl(''),
  });
  filterResult?: FilterProductResponse;
  products$: Observable<Product[]> = this._productServ.get();
  categories$: Observable<Category[]>;
  countProductReturned = 0;
  _window = window;
  _getMsgFront = getMsgFront;
  requesting = false;

  constructor(
      private readonly _dialog: MatDialog,
      private readonly _categoryServ: CategoryService,
      private readonly _loadingServ: NgxSpinnerService,
      private readonly _productServ: ProductService
  ) {
    _loadingServ.show();
    this._showLoading();
    this.categories$ = this._categoryServ.get();
    this._productServ.getForSearch(this.filter)
        .subscribe(response => {
          this.filterResult = response;
          this._hideLoading();
        });
    this.formGroup.controls['text'].valueChanges
        .pipe(
            filter(value => !!value && value.trim().length),
            debounceTime(250),
            distinctUntilChanged(),
            switchMap(text => {
              this._showLoading();
              return this._productServ.getForSearch(
                  this._updateFilter(this.filter, {...this.formGroup.value, text})
              );
            })
        )
        .subscribe(searchResult => {
          this.filterResult = searchResult;
          this._hideLoading();
        });
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

  searchProduct(form: FormSearchProduct, sort?: EProductSort) {
    if (this.formGroup.valid) {
      this._showLoading();
      this._productServ.getForSearch(
          this._updateFilter({...this.filter, sortBy: sort}, this.formGroup.value)
      ).subscribe(filterResponse => {
        this.filterResult = filterResponse;
        this._hideLoading();
      });
    }
  }

  maskDate(event: Event, control: AbstractControl) {
    const target = event.target as HTMLInputElement;
    const cursorStart = target.selectionStart ?? 0;
    const cursorEnd = target.selectionEnd ?? 0;
    target.value = masks.date(target.value);

    if ((event as InputEvent).inputType.includes('delete')) {
      target.setSelectionRange(cursorStart, cursorEnd);
    } else {
      if (target.value[target.value.length - 2] === '/') {
        target.setSelectionRange(cursorStart + 1, cursorEnd + 1);
      } else {
        target.setSelectionRange(cursorStart, cursorEnd);
      }
    }

    if (target.value.length === 10) {
      control.setValue(_moment(target.value, 'DD/MM/YYYY', 'pt'));
    }
  }

  productTrackBy(index: number, item: Product): string {
    return item.id;
  }

  deleteProduct(id: string) {
    this._productServ.delete(id)
        .subscribe(() => this.products$ = this._productServ.get());
  }

  toggleVisibility(id: string, visible: boolean) {
    this._productServ.toggleVisibility(id, visible)
        .subscribe(() => this.products$ = this._productServ.get());
  }

  private _hideLoading() {
    this.requesting = false;
    this.formGroup.enable();
  }

  private _showLoading() {
    this.requesting = true;
    this.formGroup.disable();
  }

  private _updateFilter(filterCurr: FilterProduct, formValues: FormSearchProduct): FilterProduct {
    return {
      ...filterCurr,
      categoriesId: formValues.categories,
      dateEnd: formValues.dateEnd?.toDate(),
      dateStart: formValues.dateStart?.toDate(),
      text: formValues.text
    };
  }
}

interface FormSearchProduct {
  categories: string[];
  dateEnd?: _moment.Moment;
  dateStart: _moment.Moment;
  text: string;
}
