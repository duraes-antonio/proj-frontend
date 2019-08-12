import {Component, Input, OnInit} from '@angular/core';
import {SequenciaLoja} from '../../modelos/componentes/SequenciaLoja';

@Component({
  selector: 'app-seq-lojas',
  templateUrl: './seq-loja.component.html',
  styleUrls: ['./seq-loja.component.scss']
})
export class SeqLojaComponent implements OnInit {

  constructor() { }

  @Input()
  set sequencia(sequencia: SequenciaLoja) {
    this._sequencia = sequencia;
  }

  public _sequencia: SequenciaLoja;

  ngOnInit() {
  }

}
