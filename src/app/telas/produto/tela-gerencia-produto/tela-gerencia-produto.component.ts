'use strict';
import {Component, OnInit} from '@angular/core';
import {Produto} from '../../../models/Produto';

@Component({
  selector: 'app-tela-gerencia-produto',
  templateUrl: './tela-gerencia-produto.component.html',
  styleUrls: ['./tela-gerencia-produto.component.scss']
})
export class TelaGerenciaProdutoComponent implements OnInit {

  filter = new FilterProduct();
  products: Produto[] = [];

  constructor() {
  }

  ngOnInit() {
  }
}


export class FilterProduct {
  text = '';
  itemsPerPage = 10;
  categoryId: number;
}
