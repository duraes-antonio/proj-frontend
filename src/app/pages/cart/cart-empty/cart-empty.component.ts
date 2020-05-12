import {Component} from '@angular/core';
import {routesFrontend} from '../../../../shared/constants/routes-frontend';
import {ListProductService} from '../../../services/lists/list-product.service';

@Component({
  selector: 'app-cart-empty',
  templateUrl: './cart-empty.component.html',
  styleUrls: ['./cart-empty.component.scss']
})
export class CartEmptyComponent {
  readonly routes = routesFrontend;
  readonly productList$ = this._listProductServ.getMostPurchased();

  constructor(private readonly _listProductServ: ListProductService) {
  }
}
