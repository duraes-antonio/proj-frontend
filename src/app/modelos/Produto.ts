import {Categoria} from './Categoria';

export class Produto {

  public readonly id: number;
  public readonly urlImagem: string;
  public readonly titulo: string;
  public readonly descricao: string;

  public readonly preco: number;
  public readonly precoComDesc: number;
  public readonly porcentDesc: number;

  public readonly freteGratis: boolean;
  public readonly categorias: Categoria[];
  public readonly mediaAvaliacao: number;
  public readonly qtdDisponivel: number;

  constructor(
    urlImg: string, titulo: string, descricao: string, precoVenda: number,
    emPromocao: boolean, porcentDesc?: number, categorias?: Categoria[],
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
