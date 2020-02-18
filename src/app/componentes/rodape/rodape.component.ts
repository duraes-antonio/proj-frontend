import {Component, Input} from '@angular/core';
import {ListaLinks} from '../../models/componentes/ListaLinks';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.scss']
})
export class RodapeComponent {

  @Input() set links(links: Array<ListaLinks>) {
    this._links = links;
  }

  public _links: Array<ListaLinks>;
  public anoCorrente: number = (new Date()).getFullYear();

  constructor() {
  }
}
