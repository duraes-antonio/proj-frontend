import {Component, Input} from '@angular/core';
import {ListMarket} from '../../../models/componentes/listMarket';

@Component({
  selector: 'app-slider-market',
  templateUrl: './slider-market.component.html',
  styleUrls: ['./slider-market.component.scss']
})
export class SliderMarketComponent {

  optionsGlide: any;

  private _list = new ListMarket('', []);

  get list() {
    return this._list;
  }

  @Input()
  set list(list: ListMarket) {
    this._list = list;

    if (list) {
      this.optionsGlide = this.getOptionsGlid(list.items.length);
    }
  }

  private getOptionsGlid(countItens: number): any {
    return {
      animationDuration: 300,
      type: 'slider',
      bound: true,
      startAt: 0,
      perView: Math.min(4, countItens),
      breakpoints: {
        1620: {
          perView: Math.min(6, countItens)
        },
        1440: {
          perView: Math.min(5, countItens)
        },
        1200: {
          perView: Math.min(4, countItens)
        },
        992: {
          perView: Math.min(3, countItens)
        },
        768: {
          perView: Math.min(2, countItens)
        },
        600: {
          perView: 1
        }
      }
    };
  }
}
