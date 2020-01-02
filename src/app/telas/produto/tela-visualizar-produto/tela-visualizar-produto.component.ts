import {Component, OnDestroy, OnInit} from '@angular/core';
import {DadosTeste} from '../../../../shared/DadosTeste';
import {Produto} from '../../../modelos/Produto';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {SequenciaProduto} from '../../../modelos/componentes/SequenciaProduto';
import {Avaliacao} from '../../../modelos/Avaliacao';

@Component({
  selector: 'app-tela-visualizar-produto',
  templateUrl: './tela-visualizar-produto.component.html',
  styleUrls: ['./tela-visualizar-produto.component.scss']
})
export class TelaVisualizarProdutoComponent implements OnInit, OnDestroy {

  public seqProd = new SequenciaProduto(625);
  public produto: Produto;
  public avaliacoes: Avaliacao[] = DadosTeste.avaliacoes;
  public media = (this.avaliacoes
      .map(a => a.nota)
      .reduce((a, c) => a + c) / this.avaliacoes.length
  ).toFixed(2);
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
    this.produto = this.produtos.filter(p => p.id === id)[0];
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
}
