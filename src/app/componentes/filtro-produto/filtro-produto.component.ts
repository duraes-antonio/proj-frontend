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

  public categorias: Set<Categoria>;
  public descontos: number[];
  public avaliacoes: number[];

  /*TODO: Preencher os filtros após receber os produtos*/
  private _produtos: Produto[];

  @Input()
  get produtos(): Produto[] {
    return this._produtos;
  }

  set produtos(produtos: Array<Produto>) {
    this._produtos = produtos;
    this.categorias = new Set(
      produtos
        .map(p => p.categorias)
        .reduce((a, b) => a.concat(b), [])
    );
  }

  ngOnInit() {

  }
}
