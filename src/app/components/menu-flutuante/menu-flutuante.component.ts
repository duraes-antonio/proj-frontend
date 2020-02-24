import {Component} from '@angular/core';
import {LinkAction} from '../sidenav/sidenav.component';
import {routes} from '../../../shared/constants/routes';

@Component({
  selector: 'app-menu-flutuante',
  templateUrl: './menu-flutuante.component.html',
  styleUrls: ['./menu-flutuante.component.scss']
})
export class MenuFlutuanteComponent {

  actionHome = new LinkAction(
    'Página Home', routes.home, 'fas fa-home');
  actionEnter = new LinkAction(
    'Página de Login', routes.loginEnter, 'fas fa-sign-in-alt');
  actionAdd = new LinkAction(
    'Página de cadastro de pessoas', routes.loginRegister, 'fas fa-user-plus');

  /*TODO: Chamar serviço que realiza verificação*/
  userLogged = true;
}
