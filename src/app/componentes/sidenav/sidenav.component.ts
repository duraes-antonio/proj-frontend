import {Component, Input, OnInit} from '@angular/core';
import {Sidenav} from '../../../../node_modules/materialize-css/dist/js/materialize.min.js';
import {Usuario} from '../../modelos/Usuario';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input()
  set exibir(none) {
    document.getElementById('btn-trigger').click();
  }

  @Input() usuario: Usuario;

  constructor() { }

  /**
   * Exibe o menu-lateral e escurece o restante da janela
   */
  private static iniciarModal() {
    const sidenav = document.querySelectorAll('.sidenav');
    Sidenav.init(sidenav, {});
  }

  ngOnInit() {
    document.addEventListener('DOMContentLoaded', SidenavComponent.iniciarModal);
  }
}
