import {Component, Input, OnInit} from '@angular/core';
import * as M from "../../../../node_modules/materialize-css/dist/js/materialize.js";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public menus;
  public menus_inic;

  constructor() {
  }

  @Input()
  set exibir(valor: boolean) {
    var button = document.getElementById("btn-trigger");
    button.click();
  }

  ngOnInit() {
    document.addEventListener('DOMContentLoaded', this.iniciarModal);
  }

  private iniciarModal() {
    this.menus = document.querySelectorAll('.sidenav');
    this.menus_inic = M.Sidenav.init(this.menus, {});
  }
}
