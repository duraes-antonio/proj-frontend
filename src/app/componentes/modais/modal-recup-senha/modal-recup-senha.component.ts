import {Component} from '@angular/core';

@Component({
  selector: 'app-modal-recup-senha',
  templateUrl: './modal-recup-senha.component.html',
  styleUrls: ['./modal-recup-senha.component.scss']
})
export class ModalRecupSenhaComponent {

  constructor() {
  }

  private static _mostrar = false;

  get mostrar(): boolean {
    return ModalRecupSenhaComponent._mostrar;
  }

  static exibir(): void {
    ModalRecupSenhaComponent._mostrar = true;
  }

  static ocultar(): void {
    ModalRecupSenhaComponent._mostrar = false;
  }

  fecharModal() {
    ModalRecupSenhaComponent.ocultar();
  }
}
