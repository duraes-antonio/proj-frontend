'use strict';
export class FiltroProdutoPesquisa {
  public readonly avaliacoes: number[];
  public readonly categorias: number[];
  public readonly freteGratis: boolean;
  public readonly descMin: number;
  public readonly descMax: number;
  public readonly precoMin: number;
  public readonly precoMax: number;

  public readonly paginaAtual: number;
  public readonly qtdItens: number;
  public readonly texto: string;

  constructor(
    pagAtual: number, qtdItens: number, texto?: string, avaliacoes?: number[],
    categorias?: number[], descMin?: number, descMax?: number, freteGratis?: boolean,
    precoMin?: number, precoMax?: number) {
    this.paginaAtual = pagAtual;
    this.qtdItens = qtdItens;
    this.texto = texto;

    this.avaliacoes = avaliacoes;
    this.categorias = categorias;
    this.descMin = descMin;
    this.descMax = descMax;
    this.freteGratis = freteGratis;
    this.precoMin = precoMin;
    this.precoMax = precoMax;
  }
}
