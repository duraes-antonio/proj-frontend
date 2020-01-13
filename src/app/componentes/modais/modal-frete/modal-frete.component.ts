import {Component, Input, OnInit} from '@angular/core';
import * as M from '../../../../../node_modules/materialize-css';
import {Endereco} from '../../../modelos/Endereco';

@Component({
  selector: 'app-modal-frete',
  templateUrl: './modal-frete.component.html',
  styleUrls: ['./modal-frete.component.scss']
})
export class ModalFreteComponent implements OnInit {

  @Input() show = false;
  @Input() enderecos: Endereco[];
  private idModal = 'id-modal';
  private idModalContent = 'id-modal-content';
  private idModalFooter = 'id-modal-footer';
  private idModalHeader = 'id-modal-header';

  private modalContent: HTMLElement;
  private modalFooter: HTMLElement;
  private modalHeader: HTMLElement;
  private modal: HTMLElement;

  constructor() {
  }

  ngOnInit() {
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        const modal = this.initModal(this.idModal);
        // this.initTabs();

        if (this.show) {
          modal.open();
          this.modal = document.getElementById(this.idModal);
          this.modalContent = document.getElementById(this.idModalContent);
          this.modalFooter = document.getElementById(this.idModalFooter);
          this.modalHeader = document.getElementById(this.idModalHeader);
          window.addEventListener('resize', () => this.modalResize());
          this.modalResize();
        }
      }
    );
  }

  private initModal(modalId: string): M.Modal {
    return M.Modal.init(document.getElementById(modalId), {});
  }

  private initTabs(): M.Tabs {
    return M.Tabs.init(document.querySelectorAll('.tabs'), {});
  }

  private modalResize(): void {
    const height = this.modal.offsetHeight - this.modalHeader.offsetHeight
      - this.modalFooter.offsetHeight;
    this.modalContent.style.setProperty(`--content-height`, `${height}px`);
  }
}
