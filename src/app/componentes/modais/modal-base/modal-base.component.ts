import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as M from '../../../../../node_modules/materialize-css';

@Component({
  selector: 'app-modal-base',
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.scss']
})
export class ModalBaseComponent implements OnInit {

  @Input() show = false;
  @Input() modalTitle: string;
  @Input() modalDesc: string;
  @Input() btnCancelTitle: string;
  @Input() btnAcceptTitle: string;
  @Input() actionDisabled = false;

  @Output() closed = new EventEmitter();
  @Output() action = new EventEmitter();

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
    setTimeout(
      () => {
        const modal = this.initModal(this.idModal, this.closed);
        modal.open();
        this.modal = document.getElementById(this.idModal);
        this.modalContent = document.getElementById(this.idModalContent);
        this.modalFooter = document.getElementById(this.idModalFooter);
        this.modalHeader = document.getElementById(this.idModalHeader);
        window.addEventListener('resize', () => this.modalResize());
        this.modalResize();
      }
    );
  }

  private initModal(modalId: string, emitter: EventEmitter<any>): M.Modal {
    return M.Modal.init(
      document.getElementById(modalId),
      {
        onCloseEnd: function () {
          emitter.emit();
        },
        inDuration: 100,
        outDuration: 100
      }
    );
  }

  private modalResize(): void {
    const height = this.modal.offsetHeight - this.modalHeader.offsetHeight
      - this.modalFooter.offsetHeight - 15;
    this.modalContent.style.setProperty(`--content-height`, `${height}px`);
  }
}
