import {Component} from '@angular/core';
import {ListProduct} from '../../models/componentes/list-product';
import {ListMarket} from '../../models/componentes/list-market';
import {ListProductService} from '../../services/lists/list-product.service';
import {ListSlideService} from '../../services/lists/list-slide.service';
import {Observable} from 'rxjs';
import {ListMarketService} from '../../services/lists/list-market.service';
import {ListProductConfig} from '../../components/sliders/slider-product/slider-product.component';
import {Slide} from '../../models/componentes/slide';
import {Sequence} from '../../models/componentes/sequence';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  readonly listsSlides$: Observable<Sequence<Slide>[]>;
  // public readonly cartoes: ListCard[] = [new ListCard(1)];
  listsProducts: ListProductConfig[] = [];
  readonly listsMarkets$: Observable<ListMarket[]>;

  constructor(
    private readonly _listSlideServ: ListSlideService,
    private readonly _listProductServ: ListProductService,
    private readonly _listMarketServ: ListMarketService
  ) {
    this.listsMarkets$ = _listMarketServ.get();
    this.listsSlides$ = _listSlideServ.get();
    _listProductServ.get()
      .subscribe((lists: ListProduct[]) => {
        this.listsProducts = lists.map(l => ({
          list: l,
          size: 'default',
        }));
      });
  }
}
