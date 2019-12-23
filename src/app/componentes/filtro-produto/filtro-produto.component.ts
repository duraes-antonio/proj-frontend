import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Produto} from '../../modelos/Produto';
import {Categoria} from '../../modelos/Categoria';
import {FiltroProdutoPesquisa} from '../../modelos/FiltroProduto';

@Component({
  selector: 'app-filtro-produto',
  templateUrl: './filtro-produto.component.html',
  styleUrls: ['./filtro-produto.component.scss']
})
export class FiltroProdutoComponent implements OnInit {

  @Output() filtroSelecao = new EventEmitter<FiltroProdutoPesquisa>();
  public categorias: Set<Categoria>;
  public avaliacoes: number[];
  public descontos: number[][];
  public freteGratis: boolean;
  private _filtro: FiltroProdutoPesquisa;
  /*TODO: Preencher os filtros após receber os produtos*/
  private _produtos: Produto[];

  constructor() {
  }

  @Input()
  get produtos(): Produto[] {
    return this._produtos;
  }

  set produtos(produtos: Produto[]) {
    this._produtos = produtos;
    this.avaliacoes = this.filtrarAvaliacoes(produtos);
    this.categorias = this.filtrarCategorias(produtos);
    this.descontos = this.filtrarDescontos(produtos);
    this.freteGratis = produtos.some(p => p.freteGratis);
    this._filtro = this.gerarFiltroBusca(produtos);
  }

  ngOnInit() {
  }

  private filtrarAvaliacoes(produtos: Produto[]): number[] {
    return [1, 2, 3, 4, 5]
      .filter(num => produtos
        .some(p => p.avaliacao >= num));
  }

  private filtrarCategorias(produtos: Produto[]): Set<Categoria> {
    return new Set(
      produtos
        .map(p => p.categorias)
        .reduce((a, b) => a.concat(b), [])
    );
  }

  private filtrarDescontos(produtos: Produto[]): number[][] {
    return [[1, 10], [11, 25], [26, 40], [41, 60], [61, 80], [81, 99]]
      .filter(desc =>
        produtos.some(p =>
          p.porcentDesc >= desc[0] && p.porcentDesc <= desc[1]
        )
      );
  }

  private gerarFiltroBusca(produtos: Produto[]):
    FiltroProdutoPesquisa {
    const filtro: FiltroProdutoPesquisa = new FiltroProdutoPesquisa(
      1, 2, null, null,
      produtos
        .map(p => p.categorias)
        .reduce((a, b) => a.concat(b), []),
      null,
      produtos.some(p => p.freteGratis),
      0, 0
    );
    return filtro;
  }
}
