'use strict';
import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {MatDialog} from '@angular/material/dialog';
import {DataTests} from '../../../../shared/dataTests';
import {Produto} from '../../../models/Produto';
import {Avaliacao} from '../../../models/Avaliacao';
import {Endereco} from '../../../models/Endereco';
import {DeliveryOption} from '../../../models/deliveryOption';
import {Cart} from '../../../models/cart.model';
import {ListProduct} from '../../../models/componentes/ListProduct';
import {Add, Remove} from '../../../actions/cart.action';
import {ProductService} from '../../../services/product.service';
import {calcAverage} from '../../../../shared/utilFunctions';
import {ModalAddressComponent} from '../../../components/modais/modal-address/modal-address.component';
import {ModalShippingMatComponent} from '../../../components/modais/modal-shipping-mat/modal-shipping-mat.component';
import {ModalPaymentMatComponent} from '../../../components/modais/modal-payment-mat/modal-payment-mat.component';

@Component({
  selector: 'app-tela-visualizar-produto',
  templateUrl: './tela-visualizar-produto.component.html',
  styleUrls: ['./tela-visualizar-produto.component.scss']
})
export class TelaVisualizarProdutoComponent implements OnDestroy {

  public produto: Produto;
  public prodInCart = false;
  public deliveryChosen: DeliveryOption;

  public seqProd = new ListProduct(625);
  public avaliacoes: Avaliacao[] = DataTests.avaliacoes;
  public media: number = this.calcAvgRating(this.avaliacoes, 2);
  public enderecos: Endereco[] = DataTests.enderecos;
  public deliveryOpts: DeliveryOption[] = DataTests.opcoesEntrega;

  public _showModalPayments = false;

  /*TODO: Remover após ter dados em um banco de dados*/
  private routeSub$: Subscription;
  private cart$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartStore: Store<Cart>,
    private dialog: MatDialog
  ) {
    this.routeSub$ = route.params.subscribe(
      params => {
        const idProduto = +params['id'];
        this.produto = ProductService.getById(idProduto);

        if (!this.produto) {
          router.navigateByUrl('404');
        }
      });
    this.cart$ = cartStore.subscribe(
      (res: any) => {
        if ((res.cart as Cart).productsId) {
          this.prodInCart = (res.cart as Cart).productsId
            .some(id => id === this.produto.id);
        }
      });
  }

  ngOnDestroy(): void {
    this.routeSub$.unsubscribe();
    this.cart$.unsubscribe();
  }

  showModalShipp(CEP: string) {
    /*TODO: Chamar serviço para calculo de frete*/
    const dialogRef = this.dialog.open(
      ModalShippingMatComponent,
      ModalShippingMatComponent.getConfig({optionsDelivery: this.deliveryOpts})
    );
    dialogRef.componentInstance.action.subscribe(
      (delivery: DeliveryOption) => {
        this.updateChosenDelivery(delivery);
      });
    dialogRef.componentInstance.selectAddress.subscribe(
      () => {
        this.dialog.closeAll();
        this.showModalAdress();
      });
  }

  showModalAdress() {
    const dialogRef = this.dialog.open(
      ModalAddressComponent,
      ModalAddressComponent.getConfig({showInputCEP: true, addresses: this.enderecos})
    );
    dialogRef.componentInstance.action.subscribe(
      cep => {
        this.dialog.closeAll();
        this.showModalShipp(cep);
      });
  }

  showModalPayments() {
    const dialogRef = this.dialog.open(ModalPaymentMatComponent, ModalPaymentMatComponent.getConfig());
  }

  updateChosenDelivery(delivery: DeliveryOption) {
    this.deliveryChosen = delivery;
  }

  addToCart(id: number) {
    this.cartStore.dispatch(Add(id));
  }

  remFromCart(id: number) {
    this.cartStore.dispatch(Remove(id));
  }

  private calcAvgRating(ratings: Avaliacao[], qtdDecimals = 2): number {
    return +(
      calcAverage(ratings, (aval: Avaliacao) => aval.nota)
        .toFixed(qtdDecimals)
    );
  }
}
