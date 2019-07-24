import {Component, Input, OnInit} from '@angular/core';
import * as M from "../../../../node_modules/materialize-css/dist/js/materialize.js";
import {Usuario} from "../../modelos/Usuario";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public menus;
  public menus_inic;

  @Input() usuario: Usuario;

  @Input()
  set exibir(none) {
    document.getElementById("btn-trigger").click();
  }

  constructor() { }

  ngOnInit() {
    document.addEventListener('DOMContentLoaded', this.iniciarModal);
  }

  /**
   * Exibe o menu-lateral e escurece o restante da janela
   */
  private iniciarModal() {
    this.menus = document.querySelectorAll('.sidenav');
    this.menus_inic = M.Sidenav.init(this.menus, {});
  }
}
