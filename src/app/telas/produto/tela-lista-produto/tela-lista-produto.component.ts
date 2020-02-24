'use strict';
import {Component, OnInit} from '@angular/core';
import {DataTests} from '../../../../shared/dataTests';

@Component({
  selector: 'app-tela-lista-produto',
  templateUrl: './tela-lista-produto.component.html',
  styleUrls: ['./tela-lista-produto.component.scss']
})
export class TelaListaProdutoComponent implements OnInit {

  public readonly produtos = DataTests.produtos;

  constructor() {
  }

  ngOnInit() {
    console.log(this.produtos);
  }

  /*TODO: Mudar para função que requisita os produtos*/
  print(event: number) {
    alert(event);
  }
}
