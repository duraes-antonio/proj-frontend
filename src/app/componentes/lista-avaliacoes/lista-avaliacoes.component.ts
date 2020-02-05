import {Component, Input, OnInit} from '@angular/core';
import {Avaliacao} from '../../models/Avaliacao';
import {formatoTimestamp} from '../../../shared/padroes';

@Component({
  selector: 'app-lista-avaliacoes',
  templateUrl: './lista-avaliacoes.component.html',
  styleUrls: ['./lista-avaliacoes.component.scss']
})
export class ListaAvaliacoesComponent implements OnInit {

  @Input() avaliacoes: Avaliacao[];
  public fmtData: string = formatoTimestamp;

  constructor() {
  }

  ngOnInit() {
  }
}
