import { Component } from '@angular/core';
import {ListaLinks} from './modelos/ListaLinks';
import {Link} from './modelos/Link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  listaLinks: Array<ListaLinks>;

  constructor() {
    this.listaLinks = new Array<ListaLinks>();

    const redeSociais = ['Facebook', 'Twitter', 'Zipzop', 'Instagram', 'Orkut', 'MSN'];
    const Tecnologias = ['Angular 8', 'Node JS 10', 'C#', 'MongoDB', 'Python 3.6',
      'PostgreSQL 11', 'Materialize CSS 1.0', 'Docker'];

    const linksObj1: Array<Link> = new Array<Link>();
    const linksObj2: Array<Link> = new Array<Link>();

    for (const link of redeSociais) {
      linksObj1.push(new Link(link, 'www.google.com'));
    }

    for (const link of Tecnologias) {
      linksObj2.push(new Link(link, 'www.google.com'));
    }

    this.listaLinks.push(new ListaLinks('Redes sociais', linksObj1));
    this.listaLinks.push(new ListaLinks('Tecnologias', linksObj2));
    this.listaLinks.push(new ListaLinks('Tecnologias', linksObj1));
    this.listaLinks.push(new ListaLinks('Redes sociais', linksObj2));

  }
}
