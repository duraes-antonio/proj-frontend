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
    const textLower = filter.texto.toLowerCase();
    let prods;

    if (!textLower || !textLower.trim()) {
      prods = DataTests.produtos.slice(0, 10);
    } else {
      prods = DataTests.produtos.filter(p => {
        return p.titulo.toLowerCase().indexOf(textLower) > -1
          || p.descricao.toLowerCase().indexOf(textLower) > -1
          || p.categorias.some(c => c.nome.toLowerCase().indexOf(textLower) > -1);
      });
    }
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
