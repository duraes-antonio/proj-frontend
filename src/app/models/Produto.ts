import {Categoria} from './Categoria';

export class Produto {

  public id: number;
  public urlImagem: string;
  public titulo: string;
  public descricao: string;

  public preco: number;
  public precoComDesc: number;
  public porcentDesc: number;

  public freteGratis: boolean;
  public categorias: Categoria[];
  public mediaAvaliacao: number;
  public qtdDisponivel: number;

  constructor(
    urlImg: string, titulo: string, descricao: string, precoVenda: number,
    porcentDesc?: number, categorias?: Categoria[],
    freteGratis?: boolean, id?: number, qtdDisponivel?: number
  ) {
    this.urlImagem = urlImg;
    this.titulo = titulo;
    this.descricao = descricao;
    this.preco = precoVenda;
    this.freteGratis = freteGratis;
    this.porcentDesc = porcentDesc;
    this.precoComDesc = porcentDesc > 0 ? this.preco * (100 - this.porcentDesc) / 100 : this.preco;
    this.categorias = categorias ? categorias : [];
    this.id = id;
    this.qtdDisponivel = qtdDisponivel ? qtdDisponivel : 0;
  }

  get emPromocao() {
    return this.porcentDesc && this.porcentDesc > 0;
  }
}
