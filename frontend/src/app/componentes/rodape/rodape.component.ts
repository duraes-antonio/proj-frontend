import {Component, Input, OnInit} from '@angular/core';
import {ListaLinks} from "../../modelos/ListaLinks";

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.scss']
})
export class RodapeComponent implements OnInit {

  @Input() links: Array<ListaLinks>;

  constructor() {
  }

  ngOnInit() {
    window.addEventListener('load', this.ajustarTamanhoColunas);
    window.addEventListener('resize', this.ajustarTamanhoColunas);
  }

  private ajustarTamanhoColunas() {

    let listaCols = document.getElementById("lista-cols");
    let rodape = document.getElementById("rodape");
    let cols = document.getElementsByClassName("col-links-important");

    let soma: number = 0;

    for (let i = 0; i < cols.length; ++i) {
      soma += cols[i].clientWidth;
    }

    if (soma < rodape.clientWidth) {
      listaCols.classList.add("lista-col-links");
    } else {
      listaCols.classList.remove("lista-col-links");
    }
  }
}
