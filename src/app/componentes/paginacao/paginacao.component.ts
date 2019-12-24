import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.scss']
})
export class PaginacaoComponent implements OnInit {

  public indicePaginas: number[];
  @Input() paginaAtual = 1;
  @Output() paginaSelecionada: EventEmitter<number> = new EventEmitter<number>();
  private _qtdPag: number;

  @Input('qtdPaginas')
  get qtdPaginas() {
    return this._qtdPag;
  }

  set qtdPaginas(num: number) {
    this._qtdPag = num;
    this.indicePaginas = Array(num).fill(0).map((x, i) => i + 1);
  }

  exibirBtnPagAnt(pagAtual: number): boolean {
    return pagAtual && pagAtual > 1;
  }

  exibirBtnPagProx(pagAtual: number, qtdPaginas: number): boolean {
    return pagAtual && pagAtual < qtdPaginas;
  }

  ngOnInit() {
  }

  selecionarPagina(numPagina: number) {
    this.paginaAtual = numPagina;
    this.paginaSelecionada.emit(numPagina);
  }
}
