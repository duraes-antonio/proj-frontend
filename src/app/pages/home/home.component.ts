import {Component} from '@angular/core';
import {ListSlide} from '../../models/componentes/slider';
import {ListProduct} from '../../models/componentes/list-product';
import {ListMarket} from '../../models/componentes/list-market';
import {ListProductService} from '../../services/lists/list-product.service';
import {ListSlideService} from '../../services/lists/list-slide.service';
import {Observable} from 'rxjs';
import {ListMarketService} from '../../services/lists/list-market.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  readonly listsSlides$: Observable<ListSlide[]>;
  // public readonly cartoes: ListCard[] = [new ListCard(1)];
  readonly listsProducts$: Observable<ListProduct[]>;
  readonly listsMarkets$: Observable<ListMarket[]>;

  constructor(
    private readonly _listSlideServ: ListSlideService,
    private readonly _listProductServ: ListProductService,
    private readonly _listMarketServ: ListMarketService
  ) {
    this.listsMarkets$ = _listMarketServ.get();
    this.listsProducts$ = _listProductServ.get();
    this.listsSlides$ = _listSlideServ.get();
  }
}
