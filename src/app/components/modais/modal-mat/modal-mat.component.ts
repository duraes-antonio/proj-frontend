'use strict';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import {widthMaxSmall} from '../../../../shared/constants/dom';

@Component({
  selector: 'app-modal-mat',
  templateUrl: './modal-mat.component.html',
  styleUrls: ['./modal-mat.component.scss']
})
export class ModalMatComponent implements OnDestroy, AfterViewInit {
  @Input() show = false;
  @Input() modalTitle?: string;
  @Input() modalDesc?: string;
  @Input() btnCancelTitle?: string;
  @Input() btnAcceptTitle?: string;
  @Input() actionDisabled = false;

  @Output() closed = new EventEmitter();
  @Output() action = new EventEmitter();

  private content?: HTMLElement;
  private footer?: HTMLElement;
  private header?: HTMLElement;
  private modal?: HTMLElement;

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }

  ngAfterViewInit(): void {
    this.modal = document.getElementsByClassName('mat-dialog-container')[0] as HTMLElement;
    this.content = document.getElementById('modal-content') as HTMLElement;
    this.footer = document.getElementById('modal-footer') as HTMLElement;
    this.header = document.getElementById('modal-header') as HTMLElement;
    document.body.style.overflow = 'unset';
    this.modalResize();
  }

  @HostListener('window:resize', ['$event'])
  private modalResize(): void {
    if (this.modal && this.header && this.content && this.footer) {
      this.modal.style.setProperty(`--header-height`, `${this.header.offsetHeight}px`);
      this.modal.style.setProperty(`--footer-height`, `${this.footer.offsetHeight}px`);

      if (window.innerWidth <= widthMaxSmall) {
        const internalHeight = this.header.offsetHeight
          + this.content.offsetHeight
          + this.footer.offsetHeight;
        const footerMTop = this.modal.offsetHeight - internalHeight - 48;
        this.footer.style.setProperty('--footer-margin-top', `${footerMTop}px`);
      } else {
        this.footer.style.setProperty('--footer-margin-top', `${10}px`);
      }
    }
  }
}
