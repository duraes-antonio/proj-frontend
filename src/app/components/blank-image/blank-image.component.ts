import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild} from '@angular/core';

@Component({
  selector: 'app-blank-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blank-image.component.html',
  styleUrls: ['./blank-image.component.scss']
})
export class BlankImageComponent implements AfterViewInit {

  @ViewChild('container') containerElem?: ElementRef<HTMLElement>;
  @ViewChild('containerIcon') containerIconElem!: ElementRef<HTMLElement>;
  @ViewChild('containerText') containerTextElem!: ElementRef<HTMLHeadElement>;
  private _oldWidthContainer = 0;

  @HostListener('window:resize', ['$event'])
  ajustSizeElements() {
    if (!this.containerElem?.nativeElement || this.containerElem.nativeElement.clientWidth === this._oldWidthContainer) {
      return;
    }
    console.log('resize');
    this._oldWidthContainer = this.containerElem.nativeElement.clientWidth;
    if (this._oldWidthContainer < SizeElementDOM.X_SMALL) {
      this.containerIconElem.nativeElement.style.fontSize = '50px';
      this.containerTextElem.nativeElement.style.fontSize = '14px';
    } else if (this._oldWidthContainer < SizeElementDOM.SMALL) {
      this.containerIconElem.nativeElement.style.fontSize = '75px';
      this.containerTextElem.nativeElement.style.fontSize = '18px';
    } else if (this._oldWidthContainer < SizeElementDOM.MEDIUM) {
      this.containerIconElem.nativeElement.style.fontSize = '100px';
      this.containerTextElem.nativeElement.style.fontSize = '24px';
    } else {
      this.containerIconElem.nativeElement.style.fontSize = '125px';
      this.containerTextElem.nativeElement.style.fontSize = '28px';
    }
  }

  ngAfterViewInit(): void {
    this.ajustSizeElements();
    if (this.containerElem?.nativeElement) {
      this._oldWidthContainer = this.containerElem?.nativeElement.clientWidth;
    }
  }
}

enum SizeElementDOM {
  X_SMALL = 200,
  SMALL = 420,
  MEDIUM = 768,
  LARGE = 1024
}
