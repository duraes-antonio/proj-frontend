import {Component, Input, OnInit} from '@angular/core';
import * as M from '../../../../../node_modules/materialize-css';

@Component({
  selector: 'app-modal-frete',
  templateUrl: './modal-frete.component.html',
  styleUrls: ['./modal-frete.component.scss']
})
export class ModalFreteComponent implements OnInit {

  @Input() show = false;

  constructor() {
  }

  private static initModal(idModalHtml: string): any {
    const elemModal = document.getElementById(idModalHtml);
    return elemModal ? M.Modal.init(elemModal, {}) : null;
  }

  ngOnInit() {
    document.addEventListener(
      'DOMContentLoaded',
      function (show) {
        const elemModal = document.getElementById('id-modal');
        const instance = M.Modal.init(elemModal, {});

        if (show) {
          instance.open();
        }

        const elemTabs = document.querySelectorAll('.tabs');
        const tabInstance = M.Tabs.init(elemTabs, {});
      });
  }
}
