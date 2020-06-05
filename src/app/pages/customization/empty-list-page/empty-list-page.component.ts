import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-empty-list-page',
  templateUrl: './empty-list-page.component.html',
  styleUrls: ['./empty-list-page.component.scss']
})
export class EmptyListPageComponent {
  @Output() action = new EventEmitter();
}
