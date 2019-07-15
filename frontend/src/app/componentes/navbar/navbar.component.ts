import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: [
    'navbar.component.scss',
    '../../../../node_modules/materialize-css/dist/css/materialize.min.css'
  ]
})
export class NavbarComponent implements OnInit {

  constructor() { }

  public exibirBusca: boolean;
  public aplicarFadeOut: boolean;

  ngOnInit() {
    this.exibirBusca = false;
    this.aplicarFadeOut = true;
  }

  /**
   * Oculta a barra de busca se já estiver sendo exibida, senão, exibe-a.
   */
  public toggleBusca() {

    /*Se a barra já está sendo exibida, oculte-a.
      Se a barra está oculta, exiba-a*/
    this.exibirBusca = !this.exibirBusca;
    this.aplicarFadeOut = !this.aplicarFadeOut;
  }
}
