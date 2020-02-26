'use strict';
import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  text: string;

  @Output() textOut = new EventEmitter<string>();
  @Output() searchAction = new EventEmitter<string>();
}
