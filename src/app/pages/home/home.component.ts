import {Component} from '@angular/core';
import {ListSlide} from '../../models/componentes/slider';
import {ListProduct} from '../../models/componentes/list-product';
import {ListMarket} from '../../models/componentes/list-market';
import {DataTests} from '../../../shared/dataTests';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  // TODO: Receber lista de components do banco
  readonly sliders: ListSlide[] = [...DataTests.sliders];
  // public readonly cartoes: ListCard[] = [new ListCard(1)];
  readonly listsProd: ListProduct[] = [...DataTests.listProducts];
  readonly listsMarket: ListMarket[] = [...DataTests.listMarkets];
}
