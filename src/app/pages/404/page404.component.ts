import {Component} from '@angular/core';
import {routesFrontend} from '../../../shared/constants/routes-frontend';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component {
  readonly urlRedirect = `/${routesFrontend.productsView}`;
}
