import {Component, Input} from '@angular/core';
import {ListProduct} from '../../../models/componentes/list-product';
import {routesFrontend} from '../../../../shared/constants/routesFrontend';
import {ERole} from '../../../enum/roles';

@Component({
  selector: 'app-slider-product',
  templateUrl: './slider-product.component.html',
  styleUrls: ['./slider-product.component.scss']
})
export class SliderProductComponent {

  readonly routes = routesFrontend;
  optionsGlide: any;

  constructor() {
    this._list = {
      id: '',
      title: '',
      items: [],
      itemsId: [],
      readRole: ERole.UNKNOWN
    };
  }

  private _list: ListProduct;

  get list(): ListProduct {
    return this._list;
  }

  @Input()
  set list(list: ListProduct) {
    this._list = list;
    this.optionsGlide = this._getOptionsGlid(list.items.length);
  }

  private _getOptionsGlid(countItens: number): any {
    return {
      animationDuration: 300,
      type: 'slider',
      bound: true,
      startAt: 0,
      perView: Math.min(8, countItens),
      breakpoints: {
        1620: {
          perView: Math.min(8, countItens)
        },
        1440: {
          perView: Math.min(7, countItens)
        },
        1366: {
          perView: Math.min(6, countItens)
        },
        1200: {
          perView: Math.min(5, countItens)
        },
        992: {
          perView: Math.min(4, countItens)
        },
        600: {
          perView: Math.min(3, countItens)
        },
        420: {
          perView: Math.min(2, countItens)
        },
        320: {
          perView: Math.min(1, countItens)
        }
      }
    };
  }
}
