import { Component } from '@angular/core';
import { NavbarComponent} from './componentes/navbar/navbar.component';
import {ListaLinks} from "./modelos/ListaLinks";
import {Link} from "./modelos/Link";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  listaLinks: Array<ListaLinks>;

  constructor() {
    this.listaLinks = new Array<ListaLinks>();

    let links_1 = ["Facebook", "Twitter", "Zipzop", "Instagram", "Orkut", "MSN"];
    let links_2 = ["Angular 8", "Node JS 10", "C#", "MongoDB", "Python 3.6",
      "PostgreSQL 11", "Materialize CSS 1.0", "Docker"];

    let links_obj_1: Array<Link> = new Array<Link>();
    let links_obj_2: Array<Link> = new Array<Link>();

    for (let link of links_1) {
      links_obj_1.push(new Link(link, "www.google.com"));
    }

    for (let link of links_2) {
      links_obj_2.push(new Link(link, "www.google.com"));
    }

    this.listaLinks.push(new ListaLinks("Redes sociais", links_obj_1));
    this.listaLinks.push(new ListaLinks("Tecnologias", links_obj_2));
    this.listaLinks.push(new ListaLinks("Tecnologias", links_obj_2));
    this.listaLinks.push(new ListaLinks("Tecnologias", links_obj_2));
    this.listaLinks.push(new ListaLinks("Redes sociais", links_obj_1));

  }
}
