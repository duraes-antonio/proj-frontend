import {Link} from "./Link";

export class ListaLinks {

  public titulo: string;
  public links: Array<Link>;

  constructor(titulo: string, links: Array<Link>) {
    this.titulo = titulo;
    this.links = links;
  }
}
