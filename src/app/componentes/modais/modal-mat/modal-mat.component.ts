import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-mat',
  templateUrl: './modal-mat.component.html',
  styleUrls: ['./modal-mat.component.scss']
})
export class ModalMatComponent implements OnInit, AfterViewInit {

  @ViewChild('content') dataContainer: ElementRef;
  private modalContent: HTMLElement;
  private modalFooter: HTMLElement;
  private modalHeader: HTMLElement;
  private modal: HTMLElement;

  constructor(
    public dialogRef: MatDialogRef<ModalMatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HTMLElement) {
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.dataContainer.nativeElement.innerHTML = this.data.innerHTML;
    this.modal = document.getElementById('modal');
    this.modalContent = document.getElementById('modal-content');
    this.modalFooter = document.getElementById('modal-footer');
    this.modalHeader = document.getElementById('modal-header');
    this.modalResize();
  }

  @HostListener('window:resize', ['$event'])
  private modalResize(): void {
    const height = this.modal.offsetHeight - this.modalHeader.offsetHeight
      - this.modalFooter.offsetHeight - 15;
    this.modalContent.style.setProperty(`--content-height`, `${height}px`);
  }
}
