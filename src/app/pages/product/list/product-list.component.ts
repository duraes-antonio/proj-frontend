'use strict';
import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {Product} from '../../../models/product';
import {FilterProduct, FilterProductResponse} from '../../../models/filters/filter-product';
import {ProductService} from '../../../services/product.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnDestroy {
  prods: Product[] = [];
  filterFilled?: FilterProductResponse;
  private readonly _params$: Subscription;
  private readonly _filter: FilterProduct;

  constructor(
    private readonly _loadingServ: NgxSpinnerService,
    private readonly _productServ: ProductService,
    private readonly _route: ActivatedRoute
  ) {
    this._filter = {
      currentPage: 1,
      perPage: 16
    };

    this._params$ = this._route.queryParams.subscribe((params: Params) => {
      const text = params && params['text'] ? params['text'] : '';
      this.textSearch({...this._filter, text});
    });
  }

  ngOnDestroy(): void {
    this._params$.unsubscribe();
  }

  textSearch(filter: FilterProduct) {
    this._loadingServ.show();
    this._productServ.getForSearch(filter)
      .subscribe(filterReturn => {
        this.filterFilled = filterReturn;
        this._loadingServ.hide(undefined, 250);
      });
  }

  filterSearch(filter: FilterProduct) {
    this._loadingServ.show();
    this._productServ.getForSearch(filter)
      .subscribe(filterReturn => {
        this.filterFilled = filterReturn;
        this._loadingServ.hide(undefined, 250);
      });
  }
}
