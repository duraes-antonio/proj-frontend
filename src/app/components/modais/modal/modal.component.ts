import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  /*Quando o modal for fechado, emita um valor booleano True*/
  @Output() fechado: EventEmitter<boolean> = new EventEmitter<boolean>();
  private modal;
  private _exibir = false;

  constructor() {
  }

  get mostrar(): boolean {
    return this._exibir;
  }

  @Input()
  set mostrar(valor: boolean) {

    this._exibir = valor;

    if (valor) {
      this.exibir();
    } else {
      this.ocultar();
    }
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
