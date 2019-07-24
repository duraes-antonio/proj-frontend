import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../modelos/Usuario";

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

  public exibirBusca: boolean = false;
  public aplicarFadeOut: boolean;
  public exibirSidenav: boolean = false;
  public usuarioAtual: Usuario;

  ngOnInit() {
    /*TODO: Alterar para receber os dados do usuário após login*/
    this.usuarioAtual = new Usuario(
      "Joana Maria Silva",
      "joana@email.com"
    );
    this.usuarioAtual.definirUrlAvatar(
      "https://vignette.wikia.nocookie.net/yugioh/images/0/08/T%C3%A9a_Gardner.png/revision/latest?cb=20140520004117"
    );
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

  /**
   * Oculta o menu lateral se já estiver sendo exibido, senão, exibe-o.
   */
  public toggleSidenav() {
    this.exibirSidenav = !this.exibirSidenav;
  }
}
