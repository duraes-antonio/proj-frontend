import {Component, Input} from '@angular/core';
import {ListProduct} from '../../../models/componentes/list-product';
import {routesFrontend} from '../../../../shared/constants/routes-frontend';
import {ERole} from '../../../enum/roles';
import {SliderViewOptions} from '../slider-base/slider-base.component';

@Component({
  selector: 'app-slider-product',
  templateUrl: './slider-product.component.html',
  styleUrls: ['./slider-product.component.scss']
})
export class SliderProductComponent {

  readonly routes = routesFrontend;
  sliderOptions?: SliderViewOptions;
  fnGetUrlProduct: (productId: string) => string = this._getUrlProduct;

  constructor() {
    this._listConfig = {
      list: {
        id: '',
        title: '',
        items: [],
        itemsId: [],
        readRole: ERole.UNKNOWN
      },
      size: 'default'
    };
  }

  private _listConfig: ListProductConfig;

  get listConfig(): ListProductConfig {
    return this._listConfig;
  }

  @Input()
  set listConfig(config: ListProductConfig) {
    if (config.perView || config.size === 'small') {
      this.sliderOptions = {
        id: `slider-product-${config.list.id}`,
        maxHeight: config.maxHeight,
        slidesPerView: 3,
        spaceBetween: 5,
        breakpoints: {
          796: {
            slidesPerView: Math.min(3, config.list.items.length)
          },
          600: {
            slidesPerView: Math.min(4, config.list.items.length)
          }
        }
      };
    } else {
      this.sliderOptions = this._getOptionsGlid(config.list);
    }
    this.fnGetUrlProduct = config.fnGetUrlProduct ?? this._getUrlProduct;
    this._listConfig = config;
  }

  private _getUrlProduct(productId: string): string {
    return routesFrontend.productView.replace(':id', productId);
  }

  private _getOptionsGlid(list: ListProduct): SliderViewOptions {
    return {
      id: `slider-product-${list.id}`,
      slidesPerView: Math.min(8, list.items.length),
      breakpoints: {
        1620: {
          slidesPerView: Math.min(8, list.items.length)
        },
        1440: {
          slidesPerView: Math.min(7, list.items.length)
        },
        1366: {
          slidesPerView: Math.min(6, list.items.length)
        },
        1200: {
          slidesPerView: Math.min(5, list.items.length)
        },
        992: {
          slidesPerView: Math.min(4, list.items.length)
        },
        600: {
          slidesPerView: Math.min(3, list.items.length)
        },
        420: {
          slidesPerView: Math.min(2, list.items.length)
        },
        320: {
          slidesPerView: Math.min(1, list.items.length)
        }
      }
    };
  }
}

export interface ListProductConfig {
  fnGetUrlProduct?: (productId: string) => string;
  list: ListProduct;
  maxHeight?: number;
  perView?: number;
  size: 'small' | 'default';
}
