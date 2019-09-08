import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import {Modal} from '../../../../../node_modules/materialize-css/dist/js/materialize.min.js';
import {ModalRecupSenhaComponent} from '../modal-recup-senha/modal-recup-senha.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  private modal;
  private _exibir = false;

  @Input()
  set mostrar(valor: boolean) {

    this._exibir = valor;

    if (valor) {
      this.exibir();
    } else {
      this.ocultar();
    }
  }

  get mostrar(): boolean {
    return this._exibir;
  }

  /*Quando o modal for fechado, emita um valor booleano True*/
  @Output() fechado: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {

    const modalOpcoes = {
      onCloseEnd: () => {
        this.mostrar = false;
        this.fechado.emit(true);
      }
    };

    document.addEventListener(
      'DOMContentLoaded',
      () => {

        /*Inicialize o objeto do Modal*/
        const elems = document.querySelectorAll('.modal');
        // this.modal = Modal.init(elems, modalOpcoes)[0];

        if (this._exibir) {
          this.exibir();
        }
      });
  }

  exibir() {

    if (!!this.modal) {
      this.modal.open();
    }
  }

  ocultar() {
    if (!!this.modal) {
      this.modal.close();
    }
  }
}
