'use strict';
import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {Product} from '../../../models/product';
import {FilterProduct} from '../../../models/filters/filter-product';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnDestroy {
  prods: Product[] = [];
  private readonly _params$: Subscription;
  private readonly _filter: FilterProduct;

  constructor(
    private readonly _productServ: ProductService,
    private readonly _route: ActivatedRoute
  ) {
    this._filter = {
      currentPage: 1,
      perPage: 15
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
    this._productServ.get(filter).subscribe(products => this.prods = products);
  }

  filterSearch(filter: FilterProduct) {
    this._productServ.get(filter).subscribe(products => this.prods = products);
  }
}
