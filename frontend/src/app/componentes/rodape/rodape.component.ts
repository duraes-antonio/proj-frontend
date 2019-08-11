import {Component, Input, OnInit} from '@angular/core';
import {ListaLinks} from '../../modelos/ListaLinks';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.scss']
})
export class RodapeComponent implements OnInit {

  @Input() links: Array<ListaLinks>;

  public anoCorrente: number = (new Date()).getFullYear();

  constructor() {
  }

  /**
   * Centraliza todas as colunas de links quando todas couberem na janela
   */
  private static ajustarTamanhoColunas() {

    const listaCols = document.getElementById('lista-cols');
    const rodape = document.getElementById('rodape');
    const cols = document.getElementsByClassName('col-links-important');

    let soma = 0;

    for (let i = 0; i < cols.length; ++i) {
      soma += cols[i].clientWidth;
    }

    if (soma < rodape.clientWidth) {
      listaCols.classList.add('lista-col-links');
    } else {
      listaCols.classList.remove('lista-col-links');
    }
  }

  ngOnInit() {
    window.addEventListener('load', RodapeComponent.ajustarTamanhoColunas);
    window.addEventListener('resize', RodapeComponent.ajustarTamanhoColunas);
  }
}
