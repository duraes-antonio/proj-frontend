import {DataTests} from '../../shared/dataTests';
import {Produto} from '../models/Produto';
import {FiltroProdutoPesquisa} from '../models/filters/filterProductUser.model';
import {Observable, of} from 'rxjs';

export class ProductService {

  /*TODO: Realizar busca no Backend*/
  static getAll(ids: number[]): Produto[] {
    return DataTests.produtos
      .filter(p => ids.some(id => id === p.id));
  }

  static get(filter: FiltroProdutoPesquisa): Observable<Produto[]> {
    console.log(filter);
    const textLower = filter && filter.texto ? filter.texto.toLowerCase() : '';
    let prods = DataTests.produtos.filter(p => {
      return p.titulo.toLowerCase().indexOf(textLower) > -1
        || p.descricao.toLowerCase().indexOf(textLower) > -1
        || p.categorias.some(c => c.nome.toLowerCase().indexOf(textLower) > -1);
    });

    if (filter.descMin) {
      prods = prods.filter(p => p.porcentDesc >= filter.descMin);
    }

    if (filter.descMax) {
      prods = prods.filter(p => p.porcentDesc <= filter.descMax);
    }

    if (filter.precoMin) {
      prods = prods.filter(p => p.precoComDesc >= filter.precoMin);
    }

    if (filter.precoMax) {
      prods = prods.filter(p => p.precoComDesc <= filter.precoMax);
    }

    if (!!filter.freteGratis) {
      prods = prods.filter(p => p.freteGratis === filter.freteGratis);
    }

    if (filter.categorias && filter.categorias.length) {
      prods = prods.filter(
        p => filter.categorias.some(
          cf => p.categorias.some(cp => cp.id === cf)
        )
      );
    }

    if (filter.avaliacoes && filter.avaliacoes.length) {
      prods = prods.filter(p => filter.avaliacoes
        .some(a => Math.floor(p.mediaAvaliacao) === a)
      );
    }
    console.log(prods);

    return of([...prods]);
  }

  static getById(id: number): Produto {
    return DataTests.produtos.find(p => p.id === id);
  }

  /*TODO: Realizar persistência no Backend*/
  static put(product: Produto) {
    const index = DataTests.produtos.findIndex(p => p.id === product.id);
    DataTests.produtos[index] = product;
    return product;
  }
}
