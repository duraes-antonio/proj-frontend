'use strict';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../../models/product';
import {Category} from '../../models/category';
import {FilterForSearch, FilterProduct} from '../../models/filters/filter-product';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.scss']
})
export class FilterProductComponent {

  @Output() filterEmit = new EventEmitter<FilterProduct>();

  categoriesInit: Category[] = [];
  ratingsInit: number[] = [];
  discountsInit: number[][] = [];
  freeDeliveryInit?: boolean;
  filter: FilterProduct = {
    currentPage: 1,
    perPage: 15
  };

  freeDelivery = false;
  priceMin = 0;
  priceMax = 150;
  readonly categories: string[] = [];
  readonly discounts: number[] = [];
  readonly ratings: number[] = [];
  private _filterSearch!: FilterForSearch;

  @Input()
  get filterSearch(): FilterForSearch {
    return this._filterSearch;
  }

  set filterSearch(filter: FilterForSearch) {
    console.log(filter);
    this._filterSearch = filter;
    this.ratingsInit = filter.avgReview;
    this.priceMin = filter.priceMin;
    this.priceMax = filter.priceMax;
    this.categoriesInit = filter.categories;
    this.discountsInit = filter.discounts.sort();
    this.freeDeliveryInit = filter.freeDelivery;
  }


  categoryChange(categId: string) {
    const index = this.categories.findIndex(id => id === categId);

    if (index > -1) {
      this.categories.splice(index, 1);
    } else {
      this.categories.push(categId);
    }
    this.filter = {...this.filter, categoriesId: this.categories};
    this.filterEmit.emit(this.filter);
  }

  discountChange(indexPair: number) {
    const index = this.discounts.findIndex(idx => idx === indexPair);

    if (index > -1) {
      this.discounts.splice(index, 1);
    } else {
      this.discounts.push(indexPair);
    }

    if (this.discounts && this.discounts.length) {
      this.filter = {...this.filter, discounts: this.discountsInit};
    }

    this.filterEmit.emit(this.filter);
  }

  freeDeliveryChange() {
    this.freeDelivery = !this.freeDelivery;
    this.filter = {...this.filter, freeDelivery: this.freeDelivery};
    this.filterEmit.emit(this.filter);
  }

  ratingChange(value: number) {
    const index = this.ratings.findIndex(v => v === value);

    if (index > -1) {
      this.ratings.splice(index, 1);
    } else {
      this.ratings.push(value);
    }

    this.filter = {...this.filter, avgReview: [...this.ratings]};
    this.filterEmit.emit(this.filter);
  }

  priceChange() {
    this.filter = {...this.filter, priceMax: this.priceMax, priceMin: this.priceMin};
    this.filterEmit.emit(this.filter);
  }

  private _prepareRatings(prods: Product[]): number[] {
    return [0, 1, 2, 3, 4, 5]
      .filter(num =>
        prods.some(p => Math.floor(p.avgReview) === num)
      );
  }

  private _prepareCategory(prods: Product[]): Set<Category> {
    return new Set(
      prods
        .map(p => p.categories ?? [])
        .reduce((a, b) => a.concat(b), [])
    );
  }

  private _prepareDiscounts(prods: Product[]): number[][] {
    return [[1, 10], [11, 25], [26, 40], [41, 60], [61, 80], [81, 99]]
      .filter(desc =>
        prods.some(p =>
          p.percentOff >= desc[0] && p.percentOff <= desc[1]
        )
      );
  }
}
