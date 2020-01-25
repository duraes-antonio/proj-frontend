import {Component, OnDestroy, OnInit} from '@angular/core';
import {DadosTeste} from '../../../../shared/DadosTeste';
import {Produto} from '../../../modelos/Produto';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {SequenciaProduto} from '../../../modelos/componentes/SequenciaProduto';
import {Avaliacao} from '../../../modelos/Avaliacao';
import {Endereco} from '../../../modelos/Endereco';
import {DeliveryOption} from '../../../modelos/DeliveryOption';

@Component({
  selector: 'app-tela-visualizar-produto',
  templateUrl: './tela-visualizar-produto.component.html',
  styleUrls: ['./tela-visualizar-produto.component.scss']
})
export class TelaVisualizarProdutoComponent implements OnInit, OnDestroy {

  public produto: Produto;
  public deliveryChosen: DeliveryOption;
  public seqProd = new SequenciaProduto(625);
  public avaliacoes: Avaliacao[] = DadosTeste.avaliacoes;
  public media: number = this.calcAvgRating(this.avaliacoes);
  public enderecos: Endereco[] = DadosTeste.enderecos;
  public deliveryOpts: DeliveryOption[] = DadosTeste.opcoesEntrega;
  public _showModalAddress = false;
  public _showModalDelivery = false;

  /*TODO: Remover após ter dados em um banco de dados*/
  private produtos: Produto[] = DadosTeste.produtos;
  private rotaInsc: Subscription;

  constructor(private route: ActivatedRoute) {
  }

  private _idProduto: number;

  private get idProduto(): number {
    return this._idProduto;
  }

  private set idProduto(id: number) {
    this._idProduto = id;
    /*TODO: Realizar busca no banco pelo produto*/
    this.produto = this.produtos.find(p => p.id === id);
  }

  ngOnInit() {
    this.rotaInsc = this.route.params.subscribe(
      params => {
        this.idProduto = +params['id'];
      });
  }

  ngOnDestroy(): void {
    this.rotaInsc.unsubscribe();
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

  private calcAvgRating(ratings: Avaliacao[], qtdDecimals?: number): number {
    return +(
      (ratings
          .map(a => a.nota)
          .reduce((a, c) => a + c) / ratings.length
      ).toFixed(qtdDecimals ? qtdDecimals : 2));
  }
}
