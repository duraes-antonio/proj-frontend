'use strict';
import {Component, Input, OnInit} from '@angular/core';
import {Avaliacao} from '../../models/Avaliacao';
import {fmtTimestamp} from '../../../shared/constants/formats';

@Component({
  selector: 'app-lista-avaliacoes',
  templateUrl: './lista-avaliacoes.component.html',
  styleUrls: ['./lista-avaliacoes.component.scss']
})
export class ListaAvaliacoesComponent implements OnInit {

  @Input() ratings: Avaliacao[];
  public fmtData: string = fmtTimestamp;

  constructor() {
  }

  ngOnInit() {
  }
}
