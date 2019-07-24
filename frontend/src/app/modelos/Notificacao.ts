export class Notificacao {

  public texto: string;
  public lida: boolean;
  public dataCriacao: Date;
  public dataLeitura?: Date;

  constructor(texto: string, dataCriacao: Date) {
    this.texto = texto;
    this.dataCriacao = dataCriacao;
    this.lida = false;
    this.dataLeitura = null;
  }

}
