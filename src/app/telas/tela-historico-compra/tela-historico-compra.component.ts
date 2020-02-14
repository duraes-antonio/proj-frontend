import {Component, OnInit} from '@angular/core';
import {Compra, ECompraEstado} from '../../models/Compra';
import {fmtTimestamp} from '../../../shared/padroes';
import {DadosTeste} from '../../../shared/DadosTeste';

@Component({
  selector: 'app-tela-historico-compra',
  templateUrl: './tela-historico-compra.component.html',
  styleUrls: ['./tela-historico-compra.component.scss']
})
export class TelaHistoricoCompraComponent implements OnInit {

  public readonly compras: Array<Compra>;
  public readonly fmtTimestamp: string = fmtTimestamp;
  public readonly enumStatusCompra = ECompraEstado;

  constructor() {
    this.compras = new Array<Compra>();
    this.compras.push(
      new Compra(
        new Date(), 2.52, 11.75, ECompraEstado.CANCELADA
      )
    );
    this.compras.push(
      new Compra(
        new Date(), 7.69, 12.12, ECompraEstado.DEVOLVIDA
      )
    );
    this.compras.push(
      new Compra(
        new Date(), 5.48, 47.12, ECompraEstado.EM_PREPARO
      )
    );
    this.compras.push(
      new Compra(
        new Date(), 1.91, 3.41, ECompraEstado.ENTREGUE
      )
    );

    for (let i = 0; i < 3; ++i) {
      this.compras[0].produtos.push(DadosTeste.produtos[i]);
    }
  }

  ngOnInit() {
  }

  aplicarSmileFeliz() {
    document.getElementById('id-smile').innerText = ':)';
  }

  aplicarSmileTriste() {
    document.getElementById('id-smile').innerText = ':(';
  }
}
