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
  public filtro: FiltroProdutoPesquisa = new FiltroProdutoPesquisa(1, 25);
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

  // filtroAddCateg(id: number, filtro: FiltroProdutoPesquisa):
  //   FiltroProdutoPesquisa {
  //   return {
  //     ...filtro,
  //     categoriasIds: [id].concat(filtro.categoriasIds)
  //   };
  // }

  filtroAddDesc(parMinMax: number[], filtro: FiltroProdutoPesquisa):
    FiltroProdutoPesquisa {
    return {
      ...filtro,
      descontos: filtro.descontos.concat(parMinMax)
    };
  }

  filtroAddPreco(filtro: FiltroProdutoPesquisa, min: number, max: number):
    FiltroProdutoPesquisa {
    return {...filtro, precoMin: min, precoMax: max};
  }

  filtroAddAvals(filtro: FiltroProdutoPesquisa, aval: number):
    FiltroProdutoPesquisa {
    return {...filtro, avaliacoes: filtro.avaliacoes.concat(aval)};
  }
}
