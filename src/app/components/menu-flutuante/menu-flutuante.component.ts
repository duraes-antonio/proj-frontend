import {Component} from '@angular/core';
import {LinkAction} from '../sidenav/sidenav.component';
import {routesFrontend} from '../../../shared/constants/routesFrontend';

@Component({
  selector: 'app-menu-flutuante',
  templateUrl: './menu-flutuante.component.html',
  styleUrls: ['./menu-flutuante.component.scss']
})
export class MenuFlutuanteComponent {

  actionHome = new LinkAction(
    'Página Home', routesFrontend.home, 'fas fa-home');
  actionEnter = new LinkAction(
    'Página de Login', routesFrontend.loginEnter, 'fas fa-sign-in-alt');
  actionAdd = new LinkAction(
    'Página de cadastro de pessoas', routesFrontend.loginRegister, 'fas fa-user-plus');

  /*TODO: Chamar serviço que realiza verificação*/
  userLogged = true;
}
