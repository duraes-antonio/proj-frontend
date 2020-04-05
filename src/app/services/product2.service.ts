import {DataTests} from '../../shared/dataTests';
import {Product} from '../models/product';
import {FilterProduct} from '../models/filters/filterProductUser.model';
import {Observable, of} from 'rxjs';

export class Product2Service {

  /*TODO: Realizar busca no Backend*/
  static getAll(ids: string[]): Product[] {
    return DataTests.products
      .filter(p => ids.some(id => id === p.id));
  }

  static get(filter?: FilterProduct): Observable<Product[]> {
    const textLower = filter && filter.texto ? filter.texto.toLowerCase() : '';
    let prods = DataTests.products.filter(p => {
      return p.title.toLowerCase().indexOf(textLower) > -1
        || p.desc.toLowerCase().indexOf(textLower) > -1
        || p.categories.some(c => c.name.toLowerCase().indexOf(textLower) > -1);
    });

    if (filter?.descMin) {
      prods = prods.filter(p => p.percentOff >= filter.descMin);
    }

    if (filter?.descMax) {
      prods = prods.filter(p => p.percentOff <= filter.descMax);
    }

    if (filter?.precoMin) {
      prods = prods.filter(p => p.priceWithDiscount >= filter.precoMin);
    }

    if (filter?.precoMax) {
      prods = prods.filter(p => p.priceWithDiscount <= filter.precoMax);
    }

    if (filter?.freteGratis) {
      prods = prods.filter(p => p.freeDelivery === filter.freteGratis);
    }

    if (filter?.categorias && filter.categorias.length) {
      prods = prods.filter(
        p => filter.categorias.some(
          cf => p.categories.some(cp => cp.id === cf)
        )
      );
    }

    if (filter?.avaliacoes && filter.avaliacoes.length) {
      prods = prods.filter(p => filter.avaliacoes
        .some(a => Math.floor(p.avgReview) === a)
      );
    }
    return of([...prods]);
  }

  static getById(id: number): Product | undefined {
    return DataTests.products.find(p => p.id === id.toString());
  }

  /*TODO: Realizar persistência no Backend*/
  static put(product: Product) {
    const index = DataTests.products.findIndex(p => p.id === product.id);
    DataTests.products[index] = product;
    return product;
  }
}
