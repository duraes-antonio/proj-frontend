import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalMatComponent} from '../modal-mat/modal-mat.component';

@Component({
  selector: 'app-modal-payment-mat',
  templateUrl: './modal-payment-mat.component.html',
  styleUrls: ['./modal-payment-mat.component.scss']
})
export class ModalPaymentMatComponent implements OnInit, AfterViewInit {

  @ViewChild('content', {static: false}) pRef: ElementRef<HTMLElement>;
  @Output() action = new EventEmitter();
  @Output() closed = new EventEmitter();
  modalText = {
    title: 'Formas de pagamento',
    desc: 'Aceitamos todas as formas de pagamento listadas abaixo',
    btnCancel: 'OK'
  };

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const dialogRef = this.dialog.open(ModalMatComponent, {
      maxWidth: '650px',
      width: '100%',
      height: '100%',
      maxHeight: '98%',
      id: 'modal',
      data: this.pRef.nativeElement,
    });
    dialogRef.afterClosed().subscribe(
      (res) => {
        console.log('RES', res);
        this.closed.emit();
      });
  }
}
