'use strict';

export class FiltroProdutoPesquisa {
  readonly avaliacoes: number[] = [];
  readonly categorias: number[] = [];
  readonly freteGratis?: boolean;
  readonly descMin: number = 0;
  readonly descMax: number = 100;
  readonly precoMin: number = 0;
  readonly precoMax: number = Number.MAX_SAFE_INTEGER;
  readonly paginaAtual: number = 1;
  readonly qtdItens: number = 10;
  readonly texto: string = '';

  constructor(
    pagAtual: number, qtdItens: number, texto?: string, avaliacoes?: number[],
    categorias?: number[], descMin?: number, descMax?: number, freteGratis?: boolean,
    precoMin?: number, precoMax?: number) {
    this.paginaAtual = pagAtual ? pagAtual : this.paginaAtual;
    this.qtdItens = qtdItens;
    this.texto = texto ? texto : this.texto;

    this.avaliacoes = avaliacoes ? avaliacoes : this.avaliacoes;
    this.categorias = categorias ? categorias : this.categorias;
    this.descMin = descMin ? descMin : this.descMin;
    this.descMax = descMax ? descMax : this.descMax;
    this.freteGratis = freteGratis;
    this.precoMin = precoMin ? precoMin : this.precoMin;
    this.precoMax = precoMax ? precoMax : this.precoMax;
  }
}
