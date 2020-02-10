import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {genSequence} from '../../../shared/utilFuncoes';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.scss']
})
export class PaginacaoComponent implements OnInit {

  public indicePags: number[];
  @Output() paginaSelecionada: EventEmitter<number> = new EventEmitter<number>();

  @Input() paginaAtual = 1;
  private _qtdPag: number;

  @Input()
  get qtdPags(): number {
    return this._qtdPag;
  }

  set qtdPags(num: number) {
    this._qtdPag = num;
    this.indicePags = genSequence(num > 10 ? 10 : num, 1);
  }

  ngOnInit() {
  }

  exibirBtnPagAnt(pagAtual: number): boolean {
    return pagAtual && pagAtual > 1;
  }

  exibirBtnPagProx(pagAtual: number, qtdPaginas: number): boolean {
    return pagAtual && pagAtual < qtdPaginas;
  }

  gerarSeqIndPags(
    pagAlvo: number, totPag: number, seqAtual: number[],
    fnGerarInds: (qtd: number, inic: number) => number[]): number[] {
    const tam = seqAtual.length;

    /*Se o índice da página alvo for maior que o índice da última página,
    * gere uma sequência maior de índices*/
    if (pagAlvo >= seqAtual[tam - 1] && pagAlvo < totPag) {
      return fnGerarInds(tam, (totPag - pagAlvo > 5) ? pagAlvo - 5 : totPag - 9);
    } else if (pagAlvo <= seqAtual[0] && pagAlvo > 0) {
      return fnGerarInds(tam, Math.max(pagAlvo - 5, 1));
    } else {
      return seqAtual;
    }
  }

  selecionarPagina(pagAlvo: number) {
    pagAlvo = Math.min(this.qtdPags, Math.max(1, pagAlvo));

    if (pagAlvo <= this.indicePags[0] || pagAlvo >= this.indicePags[this.indicePags.length - 1]) {
      this.indicePags = this.gerarSeqIndPags(pagAlvo, this.qtdPags, this.indicePags, genSequence);
    }

    this.paginaAtual = pagAlvo;
    this.paginaSelecionada.emit(pagAlvo);
  }
}
