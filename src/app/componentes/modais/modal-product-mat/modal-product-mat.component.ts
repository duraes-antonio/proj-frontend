import {Component, HostListener, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Produto} from '../../../models/Produto';
import {Categoria} from '../../../models/Categoria';
import {DadosTeste} from '../../../../shared/DadosTeste';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-modal-product-mat',
  templateUrl: './modal-product-mat.component.html',
  styleUrls: ['./modal-product-mat.component.scss']
})
export class ModalProductMatComponent {

  productCategs: Categoria[] = DadosTeste.categorias;
  categoryControl = new FormControl();
  private modalContent: HTMLElement;
  private modalFooter: HTMLElement;
  private modalHeader: HTMLElement;
  private modal: HTMLElement;

  constructor(
    public dialogRef: MatDialogRef<ModalProductMatComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Produto) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    setTimeout(
      () => {
        this.modal = document.getElementById('modal');
        this.modalContent = document.getElementById('modal-content');
        this.modalFooter = document.getElementById('modal-footer');
        this.modalHeader = document.getElementById('modal-header');
        this.modalResize();
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  private modalResize(): void {
    const height = this.modal.offsetHeight - this.modalHeader.offsetHeight
      - this.modalFooter.offsetHeight - 15;
    this.modalContent.style.setProperty(`--content-height`, `${height}px`);
  }
}
