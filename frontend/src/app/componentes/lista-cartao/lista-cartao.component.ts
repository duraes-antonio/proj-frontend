import {Component, Input, OnInit} from '@angular/core';
import {ListaCartao} from '../../modelos/ListaCartao';

@Component({
  selector: 'app-lista-cartao',
  templateUrl: './lista-cartao.component.html',
  styleUrls: ['./lista-cartao.component.scss']
})
export class ListaCartaoComponent implements OnInit {

  @Input() listaCartoes: ListaCartao;

  constructor() { }

  ngOnInit() {
  }

}
