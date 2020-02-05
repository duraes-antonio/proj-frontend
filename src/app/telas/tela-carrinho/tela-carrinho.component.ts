import {Component, OnDestroy, OnInit} from '@angular/core';
import {Produto} from '../../models/Produto';
import {ProductService} from '../../services/product.service';
import {Store} from '@ngrx/store';
import {Cart} from '../../models/cart.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tela-carrinho',
  templateUrl: './tela-carrinho.component.html',
  styleUrls: ['./tela-carrinho.component.scss']
})
export class TelaCarrinhoComponent implements OnInit, OnDestroy {

  productsChosen: Produto[] = [];
  totalCost = 0;
  totalShipment = 0;
  private cart$: Subscription;

  constructor(private cartStore: Store<Cart>) {
  }

  ngOnInit() {
    this.cart$ = this.cartStore.subscribe(
      (res: any) => {
        const ids = (res.cart as Cart).productsId;
        if (ids && ids.length > 0) {
          this.productsChosen = ProductService.getAll(ids);
          this.totalCost = this.productsChosen
            .map(p => p.precoComDesc)
            .reduce((p, c) => p + c);
          this.totalShipment = this.productsChosen
            .map(p => Math.random() * 100)
            .reduce((p, c) => p + c);
        }
      });
  }

  ngOnDestroy(): void {
    this.cart$.unsubscribe();
  }
}
