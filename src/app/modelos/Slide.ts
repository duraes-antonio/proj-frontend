export class Slide {

  readonly id: number;

  readonly idSlider: number;

  /**Url da imagem utilizada ao fundo do slide atual*/
  readonly imagemUrl: string;

  /**Texto curto que resume a proposta contida no slide*/
  readonly titulo?: string;

  /**Texto longo de descrição do slide*/
  readonly descricao?: string;

  /**Titulo do botão de ação do slide*/
  readonly botaoTitulo?: string;

  /**Url em que o usuário será redirecionado ao clicar*/
  readonly urlRedirecionamento: string;

  /**Ordem em que o slide é exibido*/
  readonly ordem: number;

  constructor(
    imgUrl: string, urlRedirecionar: string, titulo?: string, descricao?: string,
    btnTitulo?: string) {
    this.imagemUrl = imgUrl;
    this.urlRedirecionamento = urlRedirecionar;
    this.titulo = titulo;
    this.descricao = descricao;
    this.botaoTitulo = btnTitulo;
  }
}
