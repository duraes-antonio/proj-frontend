import {Component, Input} from '@angular/core';
import {ListMarket} from '../../../models/componentes/list-market';
import {ERole} from '../../../enum/roles';
import {SliderViewOptions} from "../slider-base/slider-base.component";

@Component({
  selector: 'app-slider-market',
  templateUrl: './slider-market.component.html',
  styleUrls: ['./slider-market.component.scss']
})
export class SliderMarketComponent {

  sliderOptions: any;

  constructor() {
    this._list = {
      id: '',
      title: '',
      items: [],
      itemsId: [],
      readRole: ERole.UNKNOWN
    };
  }

  private _list: ListMarket;

  get list(): ListMarket {
    return this._list;
  }

  @Input()
  set list(list: ListMarket) {
    this._list = list;

    if (list) {
      this.sliderOptions = this._getOptionsGlid(list);
    }
  }

  private _getOptionsGlid(list: ListMarket): SliderViewOptions {
    return {
      id: `slider-market-${list.id}`,
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
