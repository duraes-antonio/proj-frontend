import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-barra-busca',
  templateUrl: './barra-busca.component.html',
  styleUrls: ['./barra-busca.component.scss']
})
export class BarraBuscaComponent implements OnInit {

  private _exibirBarra = true;
  public textoDigitado: string;

  @Input()
  set exibir(valor: boolean) {
    this._exibirBarra = valor;
  }

  @Output() textoSaida = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Emite o texto digitado para o componente pai
   */
  public emitirTexto() {
    this.textoSaida.emit(this.textoDigitado);
  }
}
