import {Component} from '@angular/core';
import {routesFrontend} from '../../../../shared/constants/routes-frontend';

@Component({
  selector: 'app-result-empty',
  templateUrl: './result-empty.component.html',
  styleUrls: ['./result-empty.component.scss']
})
export class ResultEmptyComponent {

  readonly routes = routesFrontend;
}
