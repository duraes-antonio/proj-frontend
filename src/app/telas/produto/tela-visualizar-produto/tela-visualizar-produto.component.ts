import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {DadosTeste} from '../../../../shared/DadosTeste';
import {Produto} from '../../../models/Produto';
import {Avaliacao} from '../../../models/Avaliacao';
import {Endereco} from '../../../models/Endereco';
import {DeliveryOption} from '../../../models/DeliveryOption';
import {Cart} from '../../../models/cart.model';
import {SequenciaProduto} from '../../../models/componentes/SequenciaProduto';
import {Add, Remove} from '../../../actions/cart.action';
import {ProductService} from '../../../services/product.service';
import {calcAverage} from '../../../../shared/utilFuncoes';

@Component({
  selector: 'app-tela-visualizar-produto',
  templateUrl: './tela-visualizar-produto.component.html',
  styleUrls: ['./tela-visualizar-produto.component.scss']
})
export class TelaVisualizarProdutoComponent implements OnInit, OnDestroy {

  public produto: Produto;
  public prodInCart = false;
  public deliveryChosen: DeliveryOption;

  public seqProd = new SequenciaProduto(625);
  public avaliacoes: Avaliacao[] = DadosTeste.avaliacoes;
  public media: number = this.calcAvgRating(this.avaliacoes, 2);
  public enderecos: Endereco[] = DadosTeste.enderecos;
  public deliveryOpts: DeliveryOption[] = DadosTeste.opcoesEntrega;

  /*Controle de exibição dos modais*/
  public _showModalAddress = false;
  public _showModalDelivery = false;
  public _showModalPayments = false;

  /*TODO: Remover após ter dados em um banco de dados*/
  private routeSub$: Subscription;
  private cart$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartStore: Store<Cart>
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

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.routeSub$.unsubscribe();
    this.cart$.unsubscribe();
  }

  showModalShipp(CEP: string) {
    this._showModalAddress = false;
    /*TODO: Chamar serviço para calculo de frete*/
    this._showModalDelivery = true;
  }

  showModalAdress() {
    this._showModalDelivery = false;
    this._showModalAddress = true;
  }

  updateChosenDelivery(delivery: DeliveryOption) {
    this._showModalDelivery = false;
    this.deliveryChosen = delivery;
  }

  addToCart(id: number) {
    this.cartStore.dispatch(Add(id));
  }

  remFromCart(id: number) {
    this.cartStore.dispatch(Remove(id));
  }

  private calcAvgRating(ratings: Avaliacao[], qtdDecimals?: number): number {
    return +(
      calcAverage(ratings, (aval: Avaliacao) => aval.nota)
        .toFixed(2)
    );
  }
}
