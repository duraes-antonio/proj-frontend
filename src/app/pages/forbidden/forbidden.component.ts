import {Component} from '@angular/core';
import {routesFrontend} from '../../../shared/constants/routes-frontend';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent {

  readonly routes = routesFrontend;
}
