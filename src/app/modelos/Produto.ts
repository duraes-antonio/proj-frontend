import {Categoria} from './Categoria';

export class Produto {

  public readonly id: number;
  public readonly urlImagem: string;
  public readonly titulo: string;
  public readonly preco: number;
  public readonly precoComDesc: number;

  public readonly emPromocao: boolean;
  public readonly freteGratis: boolean;
  public readonly porcentDesc: number;
  public readonly categorias: Categoria[];
  public readonly avaliacao: number;

  constructor(
    urlImg: string, titulo: string, precoVenda: number, emPromocao: boolean,
    porcentDesc?: number, categorias?: Categoria[], freteGratis?: boolean
  ) {
    this.urlImagem = urlImg;
    this.titulo = titulo;
    this.preco = precoVenda;
    this.emPromocao = emPromocao;
    this.freteGratis = freteGratis;
    this.porcentDesc = porcentDesc;
    this.precoComDesc = this.emPromocao ? this.preco * (100 - this.porcentDesc) / 100 : this.preco;
    this.categorias = categorias ? categorias : [];
  }
}
