import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-empty-list-page',
  templateUrl: './empty-list-page.component.html',
  styleUrls: ['./empty-list-page.component.scss']
})
export class EmptyListPageComponent {
  @Input() title = 'Parece que essa será sua primeira lista.';
  @Input() titleButton = 'Criar Lista';
  @Output() action = new EventEmitter();
}
