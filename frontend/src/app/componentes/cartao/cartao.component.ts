import {Component, Input, OnInit} from '@angular/core';
import {Cartao} from "../../modelos/Cartao";

@Component({
  selector: 'app-cartao',
  templateUrl: './cartao.component.html',
  styleUrls: ['./cartao.component.scss']
})
export class CartaoComponent implements OnInit {

  @Input() cartao: Cartao;
  @Input() qtdCartoes: number;

  constructor() {
  }

  ngOnInit() {
    console.log(this.cartao);
  }
}
