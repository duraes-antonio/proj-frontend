export class Link {

  public texto: string;
  public url: string;

  constructor(titulo: string, url: string) {
    this.url = url;
    this.texto = titulo;
  }
}
