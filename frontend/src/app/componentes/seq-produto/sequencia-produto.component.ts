import {Component, Input, OnInit} from '@angular/core';
import {SequenciaProduto} from '../../modelos/componentes/SequenciaProduto';

@Component({
  selector: 'app-seq-produto',
  templateUrl: './sequencia-produto.component.html',
  styleUrls: ['./sequencia-produto.component.scss']
})
export class SequenciaProdutoComponent implements OnInit {

  constructor() { }

  @Input()
  set sequencia(sequencia: SequenciaProduto) {
    this._sequencia = sequencia;
  }

  public _sequencia: SequenciaProduto;

  ngOnInit() {
  }
}
