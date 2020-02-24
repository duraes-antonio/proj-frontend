import {Categoria} from '../Categoria';

export class FiltroProdutoPesquisa {
  public readonly avaliacoes: number[];
  public readonly categorias: Categoria[];
  public readonly descontos: number[];
  public readonly freteGratis: boolean;
  public readonly precoMin: number;
  public readonly precoMax: number;

  public readonly paginaAtual: number;
  public readonly qtdItens: number;
  public readonly texto: string;

  constructor(
    pagAtual: number, qtdItens: number, texto?: string, avaliacoes?: number[],
    categorias?: Categoria[], descontos?: number[], freteGratis?: boolean,
    precoMin?: number, precoMax?: number) {
    this.paginaAtual = pagAtual;
    this.qtdItens = qtdItens;
    this.texto = texto;

    this.avaliacoes = avaliacoes;
    this.categorias = categorias;
    this.descontos = descontos;
    this.freteGratis = freteGratis;
    this.precoMin = precoMin;
    this.precoMax = precoMax;
  }
}
