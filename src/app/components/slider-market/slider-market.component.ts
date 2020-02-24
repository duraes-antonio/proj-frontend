import {Component, Input} from '@angular/core';
import {ListMarket} from '../../models/componentes/ListMarket';

@Component({
  selector: 'app-slider-market',
  templateUrl: './slider-market.component.html',
  styleUrls: ['./slider-market.component.scss']
})
export class SliderMarketComponent {

  optionsGlide;

  private _list: ListMarket;

  get list() {
    return this._list;
  }

  @Input()
  set list(list: ListMarket) {
    this._list = list;
    this.optionsGlide = this.getOptionsGlid(list.itens.length);
  }

  private getOptionsGlid(countItens: number): any {
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
