import {Component, Input, OnInit} from '@angular/core';
import {Produto} from '../../modelos/Produto';
import {Categoria} from '../../modelos/Categoria';

@Component({
  selector: 'app-filtro-produto',
  templateUrl: './filtro-produto.component.html',
  styleUrls: ['./filtro-produto.component.scss']
})
export class FiltroProdutoComponent implements OnInit {

  constructor() {
  }

  /*TODO: Preencher os filtros após receber os produtos*/
  @Input() readonly produtos: Produto[];

  public categorias: Categoria[];
  public desconto: number[];

  ngOnInit() {

  }
}
