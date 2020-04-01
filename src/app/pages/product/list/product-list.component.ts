'use strict';
import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {FiltroProdutoPesquisa} from '../../../models/filters/filterProductUser.model';
import {ProductService} from '../../../services/product.service';
import {take} from 'rxjs/operators';
import {Product} from '../../../models/product';

@Component({
  selector: 'app-tela-lista-produto',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnDestroy {

  filterText = '';
  prods: Product[] = [];
  private params$: Subscription;

  constructor(private route: ActivatedRoute) {
    this.params$ = this.route.queryParams.subscribe((params: Params) => {
      this.filterText = params && params['text'] ? params['text'] : '';
      this.textSearch(new FiltroProdutoPesquisa(1, 10, this.filterText));
    });
  }

  ngOnDestroy(): void {
    this.params$.unsubscribe();
  }

  textSearch(filter: FiltroProdutoPesquisa) {
    ProductService.get(filter).pipe(take(1)).subscribe(prods => {
      this.prods = prods;
    });
  }

  filterSearch(filter: FiltroProdutoPesquisa) {
    ProductService.get({...filter, texto: this.filterText})
      .pipe(take(1))
      .subscribe(prods => {
        this.prods.length = 0;
        prods.forEach(p => this.prods.push(p));
      });
  }
}