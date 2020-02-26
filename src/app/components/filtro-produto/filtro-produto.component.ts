'use strict';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Produto} from '../../models/Produto';
import {Categoria} from '../../models/Categoria';
import {FiltroProdutoPesquisa} from '../../models/filters/filterProductUser.model';

@Component({
  selector: 'app-filtro-produto',
  templateUrl: './filtro-produto.component.html',
  styleUrls: ['./filtro-produto.component.scss']
})
export class FiltroProdutoComponent {

  @Output() filterEmit = new EventEmitter<FiltroProdutoPesquisa>();

  categoriesInit: Set<Categoria>;
  ratingsInit: number[];
  discountsInit: number[][];
  freeDeliveryInit: boolean;
  filter = new FiltroProdutoPesquisa(1, 10);

  freeDelivery = false;
  priceMin: number;
  priceMax: number;
  readonly categories: number[] = [];
  readonly discounts: number[] = [];
  readonly ratings: number[] = [];

  private _produtos: Produto[];

  @Input()
  get produtos(): Produto[] {
    return this._produtos;
  }

  set produtos(produtos: Produto[]) {
    this._produtos = produtos;
    this.ratingsInit = this.prepareRatings(produtos);
    this.categoriesInit = this.prepareCategory(produtos);
    this.discountsInit = this.prepareDiscounts(produtos);
    this.freeDeliveryInit = produtos.some(p => p.freteGratis);
  }


  categoryChange(categId: number) {
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
    this.filter = {
      ...this.filter,
      descMin: this.discounts && this.discounts.length
        ? this.discountsInit[Math.min(...this.discounts)][0] : null,
      descMax: this.discounts && this.discounts.length
        ? this.discountsInit[Math.max(...this.discounts)][1] : null,
    };
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

  private prepareRatings(prods: Produto[]): number[] {
    return [0, 1, 2, 3, 4, 5]
      .filter(num =>
        prods.some(p => Math.floor(p.mediaAvaliacao) === num)
      );
  }

  private prepareCategory(prods: Produto[]): Set<Categoria> {
    return new Set(
      prods
        .map(p => p.categorias)
        .reduce((a, b) => a.concat(b), [])
    );
  }

  private prepareDiscounts(prods: Produto[]): number[][] {
    return [[1, 10], [11, 25], [26, 40], [41, 60], [61, 80], [81, 99]]
      .filter(desc =>
        prods.some(p =>
          p.porcentDesc >= desc[0] && p.porcentDesc <= desc[1]
        )
      );
  }
}
