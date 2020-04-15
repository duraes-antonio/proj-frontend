import {Component, Input} from '@angular/core';
import {ListCard} from '../../models/componentes/list-card';

@Component({
  selector: 'app-lista-cartao',
  templateUrl: './lista-cartao.component.html',
  styleUrls: ['./lista-cartao.component.scss']
})
export class ListaCartaoComponent {

  @Input() listCard?: ListCard;
}
