import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-barra-busca',
  templateUrl: './barra-busca.component.html',
  styleUrls: ['./barra-busca.component.scss']
})
export class BarraBuscaComponent implements OnInit {

  public textoDigitado: string;

  @Output() textoSaida = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    setTimeout(this.aplicarFadeIn);
  }

  public emitirTexto() {
    this.textoSaida.emit(this.textoDigitado);
  }

  /**
   * Aplica o efeito de entrada (descida) na barra de busca
   */
  private aplicarFadeIn(): void {
    document.getElementById('barra-busca').className = 'bloco-descida';
  }
}
