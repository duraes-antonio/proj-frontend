import {Component, Input} from '@angular/core';
import {ListProduct} from '../../models/componentes/ListProduct';
import Glide from '@glidejs/glide';
import {routes} from '../../../shared/constants/routes';

@Component({
  selector: 'app-seq-produto',
  templateUrl: './slider-product.component.html',
  styleUrls: ['./slider-product.component.scss']
})
export class SliderProductComponent {

  readonly routes = routes;
  readonly sliderIdPrefix = 'glide-slider-product';
  @Input() list: ListProduct;
  private _glide: Glide;

  constructor() {
  }
}
