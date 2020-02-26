import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Produto} from '../../models/Produto';
import {Categoria} from '../../models/Categoria';
import {FiltroProdutoPesquisa} from '../../models/filters/filterProductUser.model';

@Component({
  selector: 'app-filtro-produto',
  templateUrl: './filtro-produto.component.html',
  styleUrls: ['./filtro-produto.component.scss']
})
export class FiltroProdutoComponent {

  @Output() filtroSelecao = new EventEmitter<FiltroProdutoPesquisa>();
  public categories: Set<Categoria>;
  public ratings: number[];
  public discounts: number[][];
  public freeDelivery: boolean;
  public filter: FiltroProdutoPesquisa = new FiltroProdutoPesquisa(1, 25);

  constructor() {
  }

  private _produtos: Produto[];

  @Input()
  get produtos(): Produto[] {
    return this._produtos;
  }

  set produtos(produtos: Produto[]) {
    this._produtos = produtos;
    this.ratings = this.filterRatings(produtos);
    this.categories = this.filterCategory(produtos);
    this.discounts = this.filterDiscounts(produtos);
    this.freeDelivery = produtos.some(p => p.freteGratis);
  }

  filtroAddDesc(parMinMax: number[], filtro: FiltroProdutoPesquisa):
    FiltroProdutoPesquisa {
    return {...filtro, descontos: filtro.descontos.concat(parMinMax)};
  }

  filtroAddPreco(filtro: FiltroProdutoPesquisa, min: number, max: number):
    FiltroProdutoPesquisa {
    return {...filtro, precoMin: min, precoMax: max};
  }

  filtroAddAvals(filtro: FiltroProdutoPesquisa, aval: number):
    FiltroProdutoPesquisa {
    return {...filtro, avaliacoes: filtro.avaliacoes.concat(aval)};
  }

  // filtroAddCateg(id: number, filtro: FiltroProdutoPesquisa):
  //   FiltroProdutoPesquisa {
  //   return {
  //     ...filtro,
  //     categoriasIds: [id].concat(filtro.categoriasIds)
  //   };
  // }

  private filterRatings(prods: Produto[]): number[] {
    return [1, 2, 3, 4, 5]
      .filter(num =>
        prods.some(p => p.mediaAvaliacao >= num)
      );
  }

  private filterCategory(prods: Produto[]): Set<Categoria> {
    return new Set(
      prods
        .map(p => p.categorias)
        .reduce((a, b) => a.concat(b), [])
    );
  }

  private filterDiscounts(prods: Produto[]): number[][] {
    return [[1, 10], [11, 25], [26, 40], [41, 60], [61, 80], [81, 99]]
      .filter(desc =>
        prods.some(p =>
          p.porcentDesc >= desc[0] && p.porcentDesc <= desc[1]
        )
      );
  }
}
