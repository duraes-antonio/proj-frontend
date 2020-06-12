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
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {EProductSort} from '../../../enum/product-sort';
import {FilterProduct, FilterProductResponse} from '../../../models/filters/filter-product';
import * as _ from 'lodash';

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

    readonly dataAdd: SequenceAdd<Product> = this.data.listProduct
        ? _.cloneDeep(this.data.listProduct) : {
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
        slides: new FormControl(
          this.dataAdd.itemsId, Validators.minLength(1)
        )
    });
    readonly mapProductIdInList = new Map<string, boolean>();
    readonly textChanges$: Observable<any>;
    resultSearchProducts?: FilterProductResponse;
    showProducts = false;
    loaded = true;
    private readonly _filterProductInitial: FilterProduct = {
        perPage: 10,
        currentPage: 1,
        sortBy: EProductSort.DEFAULT
    };

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ModalListProductData,
        private readonly _listProductServ: ListProductService,
        private readonly _productServ: ProductService
    ) {
        this._fillMapFromList(this.dataAdd?.items);
        this._extractSearch(this._productServ.getForSearch(this._filterProductInitial));
        this.textChanges$ = this.listFormGroup.controls['textSearch'].valueChanges
            .pipe(
                debounceTime(250),
                distinctUntilChanged(),
                switchMap(text => {
                    this._showLoading();
                    return this._productServ.getForSearch({...this._filterProductInitial, text});
                })
            );
        this._extractSearch(this.textChanges$);
    }

    static getConfig(data: ModalListProductData): MatDialogConfig {
        return {
            data: data,
            maxHeight: '100vh',
            maxWidth: '650px',
        };
    }

    save() {
        if (this.data.listProduct) {
            this._listProductServ.patch(
                {
                    title: this.listFormGroup.controls['title'].value,
                    itemsId: (this.dataAdd.items as Product[]).map(p => p.id),
                },
                this.data.listProduct.id
            ).subscribe(sequence => this.action.emit(sequence));
        } else {
            this._listProductServ.post({
                title: this.listFormGroup.controls['title'].value,
                itemsId: (this.dataAdd.items as Product[]).map(p => p.id),
                readRole: this.dataAdd.readRole
            }).subscribe(sequence => this.action.emit(sequence));
        }
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

    changePage(page: number) {
        this._extractSearch(
            this._productServ.getForSearch({
                ...this._filterProductInitial,
                currentPage: page,
                text: this.listFormGroup.controls['textSearch'].value
            })
        );
    }

    private _fillMapFromList(products?: Product[]) {
        if (!products) {
            return;
        }
        products.forEach(p => this.mapProductIdInList.set(p.id, true));
    }

    private _showLoading() {
        this.loaded = false;
        this.listFormGroup.disable();
    }

    private _hideLoading() {
        this.loaded = true;
        this.listFormGroup.enable();
    }

    private _extractSearch(observable: Observable<FilterProductResponse>) {
        this._showLoading();
        observable.subscribe(resultSearchProducts => {
            this.resultSearchProducts = resultSearchProducts;
            this._hideLoading();
            setTimeout(() => document.getElementById('input-title')?.focus());
        });
    }
}

export interface ModalListProductData {
    listProduct?: Sequence<Product>;
}
