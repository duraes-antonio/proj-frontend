import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'app-barra-busca',
  templateUrl: './barra-busca.component.html',
  styleUrls: ['./barra-busca.component.scss']
})
export class BarraBuscaComponent implements OnInit, AfterViewChecked {

  private _exibirBarra: boolean;
  public textoDigitado: string;

  @Input()
  set exibir(valor: boolean) {
    this._exibirBarra = valor;
  }

  @Output() textoSaida = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    setTimeout(this.aplicarFadeIn);
  }

  /**
   * Emite o texto digitado para o componente pai
   */
  public emitirTexto() {
    this.textoSaida.emit(this.textoDigitado);
  }

  /**
   * Aplica o efeito de entrada (descida) na barra de busca
   */
  private aplicarFadeIn(): void {
    document.getElementById('barra-busca').className = 'bloco-descida';
  }

  ngAfterViewChecked(): void {
    if (this._exibirBarra) {
      document.getElementById('pesquisa-input').focus();
    }
  }
}
