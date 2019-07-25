export class Notificacao {

  public id: number = 0;
  public texto: string;
  public lida: boolean;
  public dataCriacao: Date;
  public dataLeitura?: Date;

  constructor(texto: string, dataCriacao: Date) {
    this.id = Math.floor(Math.random() * 1000);
    this.texto = texto;
    this.dataCriacao = dataCriacao;
    this.lida = false;
    this.dataLeitura = null;
  }

}
