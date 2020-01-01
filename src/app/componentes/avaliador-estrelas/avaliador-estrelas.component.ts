import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-avaliador-estrelas',
  templateUrl: './avaliador-estrelas.component.html',
  styleUrls: ['./avaliador-estrelas.component.scss']
})
export class AvaliadorEstrelasComponent implements OnInit {

  @Input() mediaAvaliacao = 0;
  @Input() numeroAvaliacoes = 0;
  @Input() fontSize = 20;
  public difMediaIndices = this.calcDifsMediaIndices(this.qtdEstrelas, this.mediaAvaliacao);

  constructor(private sanitizer: DomSanitizer) {
  }

  private _qtdEstrelas = 5;

  get qtdEstrelas() {
    return this._qtdEstrelas;
  }

  @Input()
  set qtdEstrelas(valor: number) {
    this._qtdEstrelas = valor;
    this.difMediaIndices = this.calcDifsMediaIndices(valor, this.mediaAvaliacao);
  }

  @HostBinding('attr.style')
  get valueAsStyle(): any {
    return this.sanitizer
      .bypassSecurityTrustStyle(
        `--porcentPreench: ${100 * this.difMediaIndices[Math.floor(this.mediaAvaliacao)]}%;
        --fontSize: ${this.fontSize}px`
      );
  }

  ngOnInit() {
  }

  calcDifsMediaIndices(qtdEstrelas: number, media: number): number[] {
    return Array(qtdEstrelas)
      .fill(0).map((x, i) => media - i);
  }
}
