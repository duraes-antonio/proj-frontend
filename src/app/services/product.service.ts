import {DadosTeste} from '../../shared/DadosTeste';
import {Produto} from '../models/Produto';

export class ProductService {

  /*TODO: Realizar busca no Backend*/
  public static getAll(ids: number[]): Produto[] {
    return DadosTeste.produtos
      .filter(p => ids.some(id => id === p.id));
  }

  public static getById(id: number): Produto {
    return DadosTeste.produtos.find(p => p.id === id);
  }

  /*TODO: Realizar persistência no Backend*/
  public static put(product: Produto) {
    const index = DadosTeste.produtos.findIndex(p => p.id === product.id);
    DadosTeste.produtos[index] = product;
    return product;
  }
}
