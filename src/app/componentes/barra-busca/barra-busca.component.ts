'use strict';
import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-barra-busca',
  templateUrl: './barra-busca.component.html',
  styleUrls: ['./barra-busca.component.scss']
})
export class BarraBuscaComponent {
  public text: string;

  @Output() textOut = new EventEmitter<string>();
}
