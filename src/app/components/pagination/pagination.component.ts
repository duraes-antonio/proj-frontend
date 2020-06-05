import {Component, EventEmitter, Input, Output} from '@angular/core';
import {genSequence} from '../../../shared/util';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() pageStart = 1;
  @Output() pageSelected = new EventEmitter<number>();
  indexPages: number[] = [];
  private _lenPages = 1;

  constructor(private _breakpointObserver: BreakpointObserver) {
    _breakpointObserver.observe([Breakpoints.XSmall])
      .subscribe(result => {
        this._mobile = result.matches;
        this.lengthPages = Math.ceil(this.totalItems / this.perPage);
        this.selectPage(this.pageStart);
      });
  }

  private _perPage = 10;
  private _mobile = false;

  @Input()
  get perPage(): number {
    return this._perPage;
  }

  set perPage(quantity: number) {
    this._perPage = quantity;
    this.lengthPages = Math.ceil(this.totalItems / quantity);
  }

  private _totalItems = 10;

  @Input()
  get lengthPages(): number {
    return this._lenPages;
  }

  @Input()
  get totalItems(): number {
    return this._totalItems;
  }

  set totalItems(quantity: number) {
    this._totalItems = quantity;
    this.lengthPages = Math.ceil(this.totalItems / this.perPage);
  }

  set lengthPages(length: number) {
    this._lenPages = length;
    const lengthItems = length > 10 && !this._mobile ? 10 : Math.min(length, 5);
    this.indexPages = this.getIndexesSequence(
      this.pageStart,
      length,
      genSequence(lengthItems, this.pageStart),
      genSequence
    );
  }

  showButtonPrevius(pageCurrent: number): boolean {
    return pageCurrent > 1;
  }

  showButtonNext(pageCurrent: number, lengthPages: number): boolean {
    return pageCurrent < lengthPages;
  }

  getIndexesSequence(
    targetPage: number, totalPages: number, currentSequence: number[],
    fnGenIndexSeq: (len: number, start: number) => number[]): number[] {
    const tam = currentSequence.length;
    /*Se o índice da página alvo for maior/igual o índice da última página,
    * gere uma sequência maior de índices*/
    if (targetPage >= currentSequence[currentSequence.length - 1]) {
      return fnGenIndexSeq(tam, Math.min(targetPage, totalPages - tam + 1));
    }
    if (targetPage <= currentSequence[0]) {
      return fnGenIndexSeq(tam, Math.max(1, targetPage - tam + 1));
    }
    return currentSequence;
  }

  selectPage(targetPage: number) {
    const target = Math.min(this.lengthPages, Math.max(1, targetPage));

    if (target <= this.indexPages[0] || target >= this.indexPages[this.indexPages.length - 1]) {
      this.indexPages = this.getIndexesSequence(target, this.lengthPages, this.indexPages, genSequence);
    }
    this.pageStart = target;
    this.pageSelected.emit(target);
  }
}
