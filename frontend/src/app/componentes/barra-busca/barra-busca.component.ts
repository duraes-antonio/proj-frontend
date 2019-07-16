import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-barra-busca',
  templateUrl: './barra-busca.component.html',
  styleUrls: ['./barra-busca.component.scss']
})
export class BarraBuscaComponent implements OnInit {

  public textoDigitado: string;

  constructor() {
  }

  @Input() set fadeOutAplicar(valor: boolean) {
    if (valor) {
      this.aplicarFadeOut();
    }
  }

  ngOnInit() {
    setTimeout(this.aplicarFadeIn);
  }

  public emitirTexto(texto) {
    alert(texto);
  }

  private aplicarFadeIn(): void {
    document.getElementById('barra-busca').className = 'slideDown';
  }

  private aplicarFadeOut(): void {
    document.getElementById('barra-busca').className = 'slideUp';
  }
}
