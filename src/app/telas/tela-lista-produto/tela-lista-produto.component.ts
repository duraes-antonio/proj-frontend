import {Component, OnInit} from '@angular/core';
import {DadosTeste} from '../../shared/DadosTeste';
import {Collapsible} from 'materialize-css/dist/js/materialize.min';

@Component({
  selector: 'app-tela-lista-produto',
  templateUrl: './tela-lista-produto.component.html',
  styleUrls: ['./tela-lista-produto.component.scss']
})
export class TelaListaProdutoComponent implements OnInit {

  public readonly produtos = DadosTeste.produtos;

  constructor() {
  }

  ngOnInit() {
    this.produtos.pop();
    document.addEventListener('DOMContentLoaded',
      function () {
        const elems = document.querySelectorAll('.collapsible');
        const instances = Collapsible.init(elems, {});
      });
  }
}
