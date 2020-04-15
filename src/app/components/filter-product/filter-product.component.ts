'use strict';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../../models/product';
import {Category} from '../../models/category';
import {FilterProduct} from '../../models/filters/filter-product-user';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.scss']
})
export class FilterProductComponent {

  @Output() filterEmit = new EventEmitter<FilterProduct>();

  categoriesInit = new Set<Category>();
  ratingsInit: number[] = [];
  discountsInit: number[][] = [];
  freeDeliveryInit?: boolean;
  filter = new FilterProduct(1, 10);

  freeDelivery = false;
  priceMin = 0;
  priceMax = 150;
  readonly categories: string[] = [];
  readonly discounts: number[] = [];
  readonly ratings: number[] = [];
  private _produtos: Product[] = [];

  @Input()
  get produtos(): Product[] {
    return this._produtos;
  }

  set produtos(produtos: Product[]) {
    this._produtos = produtos;
    this.ratingsInit = this._prepareRatings(produtos);
    this.categoriesInit = this._prepareCategory(produtos);
    this.discountsInit = this._prepareDiscounts(produtos);
    this.freeDeliveryInit = produtos.some(p => p.freeDelivery);
  }


  categoryChange(categId: string) {
    const index = this.categories.findIndex(id => id === categId);

    if (index > -1) {
      this.categories.splice(index, 1);
    } else {
      this.categories.push(categId);
    }
    this.filter = {...this.filter, categorias: this.categories};
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
      this.filter = {
        ...this.filter,
        descMin: this.discountsInit[Math.min(...this.discounts)][0],
        descMax: this.discountsInit[Math.max(...this.discounts)][1],
      };
    }

    this.filterEmit.emit(this.filter);
  }

  freeDeliveryChange() {
    this.freeDelivery = !this.freeDelivery;
    this.filter = {...this.filter, freteGratis: this.freeDelivery};
    this.filterEmit.emit(this.filter);
  }

  ratingChange(value: number) {
    const index = this.ratings.findIndex(v => v === value);

    if (index > -1) {
      this.ratings.splice(index, 1);
    } else {
      this.ratings.push(value);
    }

    this.filter = {...this.filter, avaliacoes: [...this.ratings]};
    this.filterEmit.emit(this.filter);
  }

  priceChange() {
    this.filter = {...this.filter, precoMax: this.priceMax, precoMin: this.priceMin};
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
        .map(p => p.categories)
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