import {Component} from '@angular/core';
import {Slider} from '../../models/componentes/slider';
import {ListProduct} from '../../models/componentes/listProduct';
import {ListMarket} from '../../models/componentes/listMarket';
import {DataTests} from '../../../shared/dataTests';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss']
})
export class TelaInicialComponent {

  // TODO: Receber lista de components do banco
  public readonly sliders: Slider[] = [...DataTests.sliders];
  // public readonly cartoes: ListCard[] = [new ListCard(1)];
  public readonly listsProd: ListProduct[] = [...DataTests.listProducts];
  public readonly listsMarket: ListMarket[] = [...DataTests.listMarkets];
}
