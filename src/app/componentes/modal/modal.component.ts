import {Component, Input, OnInit} from '@angular/core';
import {Modal} from '../../../../node_modules/materialize-css/dist/js/materialize.min.js';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  private modal;
  public _exibir;

  @Input()
  set mostrar(valor: boolean) {

    if (valor) {
      this.exibir();
    } else {
      this.ocultar();
    }

    this._exibir = valor;
  }

  constructor() {
  }

  ngOnInit() {
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        const elems = document.querySelectorAll('.modal');
        this.modal = Modal.init(elems, {})[0];

        if (this._exibir) {
          this.exibir();
        }

        const modal = document.getElementsByClassName('modal-overlay');
        const overlay: HTMLElement = modal[0] as HTMLElement;
        overlay.style.width = screen.width + 'px';
        overlay.style.height = screen.height + 'px';
        overlay.style.left = 'unset';
        overlay.style.right = 'unset';
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
