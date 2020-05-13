'use strict';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FilterProduct, FilterProductResponse} from '../../models/filters/filter-product';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.scss']
})
export class FilterProductComponent {

  @Output() filterEmit = new EventEmitter<FilterProduct>();

  freeDelivery = false;
  priceMin = 0;
  priceMax = 150;
  readonly categoriesInclude = new Map<string, boolean>();
  readonly discountsInclude = new Map<number, boolean>();
  readonly ratingsInclude = new Map<number, boolean>();
  _filterForRequest: FilterProduct = {
    currentPage: 1,
    perPage: 15
  };
  private _filterRes!: FilterProductResponse;

  @Input()
  get filterResponse(): FilterProductResponse {
    return this._filterRes;
  }

  set filterResponse(filter: FilterProductResponse) {
    this._filterRes = filter;
    filter.categoriesId.forEach(id =>
      this.categoriesInclude.set(id, this.categoriesInclude.get(id) ?? false)
    );
    filter.discounts.forEach((pMinMax: [number, number]) =>
      this.discountsInclude.set(pMinMax[0] + pMinMax[1], this.discountsInclude.get(pMinMax[0] + pMinMax[1]) ?? false)
    );
    filter.avgReview.forEach((ratingValue: number) =>
      this.ratingsInclude.set(ratingValue, this.ratingsInclude.get(ratingValue) ?? false)
    );
    this.priceMin = +(filter.priceMin.toFixed(2));
    this.priceMax = +(filter.priceMax.toFixed(2));
  }

  categoryChange(categId: string) {
    this.categoriesInclude.set(categId, !this.categoriesInclude.get(categId));
    this._filterForRequest = {
      ...this._filterForRequest,
      categoriesId: Array.from(this.categoriesInclude)
        .filter((idUse: [string, boolean]) => idUse[1])
        .map((idUse: [string, boolean]) => idUse[0])
    };
    this.filterEmit.emit(this._filterForRequest);
  }

  discountChange(sumPercentMinMax: number) {
    this.discountsInclude.set(sumPercentMinMax, !this.discountsInclude.get(sumPercentMinMax));
    this._filterForRequest = {
      ...this._filterForRequest,
      discounts: this.filterResponse.discounts
        .filter((pairUse) => this.discountsInclude.get(pairUse[0] + pairUse[1]))
    };
    this.filterEmit.emit(this._filterForRequest);
  }

  freeDeliveryChange() {
    this.freeDelivery = !this.freeDelivery;
    this._filterForRequest = {...this._filterForRequest, freeDelivery: this.freeDelivery};
    this.filterEmit.emit(this._filterForRequest);
  }

  priceChange() {
    this._filterForRequest = {
      ...this._filterForRequest,
      priceMax: this.priceMax,
      priceMin: this.priceMin
    };
    this.filterEmit.emit(this._filterForRequest);
  }

  ratingChange(value: number) {
    this.ratingsInclude.set(value, !this.ratingsInclude.get(value));
    this._filterForRequest = {
      ...this._filterForRequest,
      avgReview: Array.from(this.ratingsInclude)
        .filter((ratingInclude: [number, boolean]) => ratingInclude[1])
        .map((ratingInclude: [number, boolean]) => ratingInclude[0])
    };
    this.filterEmit.emit(this._filterForRequest);
  }
}
