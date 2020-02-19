import {Component, Input, ViewChild} from '@angular/core';
import {Usuario} from '../../models/Usuario';
import {productsManager} from '../../../shared/constants/routes';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  @Input()
  set exibir(none) {
    document.getElementById('btn-trigger').click();
  }

  @Input() usuario: Usuario;
  readonly routeProductsManager = productsManager;

  constructor() { }

  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

}
