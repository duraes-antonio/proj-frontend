import {Categoria} from './Categoria';

export class Produto {

  public id: number;
  public titulo: string;
  public descricao: string;
  public urlImagem = 'assets/img/sem-imagem.png';

  public preco: number;
  public precoComDesc: number;
  public porcentDesc: number;

  public freteGratis = false;
  public categorias: Categoria[] = [];
  public mediaAvaliacao: number;
  public qtdDisponivel: number;

  constructor(
    titulo: string, descricao: string, precoVenda: number, urlImg?: string,
    porcentDesc?: number, categorias?: Categoria[],
    freteGratis?: boolean, id?: number, qtdDisponivel?: number, mediaAval?: number
  ) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.preco = precoVenda;
    this.urlImagem = urlImg ? urlImg : this.urlImagem;
    this.freteGratis = !!freteGratis ? freteGratis : false;
    this.porcentDesc = porcentDesc;
    this.precoComDesc = porcentDesc > 0 ? this.preco * (100 - this.porcentDesc) / 100 : this.preco;
    this.categorias = categorias ? categorias : [];
    this.id = id;
    this.qtdDisponivel = qtdDisponivel ? qtdDisponivel : 0;
    this.mediaAvaliacao = mediaAval;
  }

  get emPromocao() {
    return this.porcentDesc && this.porcentDesc > 0;
  }

  get semImagem(): boolean {
    return !this.urlImagem || this.urlImagem.startsWith('assets');
  }
}
