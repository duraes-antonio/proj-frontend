import {Component, OnInit} from '@angular/core';
import {routesFrontend} from '../../../../shared/constants/routes-frontend';

@Component({
  selector: 'app-cart-empty',
  templateUrl: './cart-empty.component.html',
  styleUrls: ['./cart-empty.component.scss']
})
export class CartEmptyComponent implements OnInit {

  readonly routes = routesFrontend;

  constructor() {
  }

  ngOnInit(): void {
  }

}
