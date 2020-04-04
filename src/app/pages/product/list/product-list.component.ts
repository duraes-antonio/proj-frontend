'use strict';
import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {FilterProduct} from '../../../models/filters/filterProductUser.model';
import {Product2Service} from '../../../services/product2.service';
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
      this.textSearch(new FilterProduct(1, 10, this.filterText));
    });
  }

  ngOnDestroy(): void {
    this.params$.unsubscribe();
  }

  textSearch(filter: FilterProduct) {
    Product2Service.get(filter).pipe(take(1)).subscribe(prods => {
      this.prods = prods;
    });
  }

  filterSearch(filter: FilterProduct) {
    Product2Service.get({...filter, texto: this.filterText})
      .pipe(take(1))
      .subscribe(prods => {
        this.prods.length = 0;
        prods.forEach(p => this.prods.push(p));
      });
  }
}
