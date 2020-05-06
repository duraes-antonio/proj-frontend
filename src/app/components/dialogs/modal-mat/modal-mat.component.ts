'use strict';
import {AfterViewInit, Component, EventEmitter, HostListener, Input, OnDestroy, Output} from '@angular/core';
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

  private _content?: HTMLElement;
  private _footer?: HTMLElement;
  private _header?: HTMLElement;
  private _modal?: HTMLElement;

  ngOnDestroy(): void {
    document.body.style.overflow = 'initial';
  }

  ngAfterViewInit(): void {
    this._modal = document.getElementsByClassName('mat-dialog-container')[0] as HTMLElement;
    this._content = document.getElementById('modal-content') as HTMLElement;
    this._footer = document.getElementById('modal-footer') as HTMLElement;
    this._header = document.getElementById('modal-header') as HTMLElement;
    document.body.style.overflow = 'unset';
    this._modalResize();
  }

  @HostListener('window:resize', ['$event'])
  private _modalResize(): void {
    if (this._modal && this._header && this._content && this._footer) {
      this._modal.style.setProperty(`--header-height`, `${this._header.offsetHeight}px`);
      this._modal.style.setProperty(`--footer-height`, `${this._footer.offsetHeight}px`);

      if (window.innerWidth <= widthMaxSmall) {
        const internalHeight: number = this._header.offsetHeight
          + this._content.offsetHeight
          + this._footer.offsetHeight;
        const footerMTop: number = this._modal.offsetHeight - internalHeight - 75;
        this._footer.style.setProperty('--footer-margin-top', `${footerMTop}px`);
      } else {
        this._footer.style.setProperty('--footer-margin-top', `${10}px`);
      }
    }
  }
}
