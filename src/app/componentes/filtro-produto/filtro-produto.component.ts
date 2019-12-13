import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-filtro-produto',
  templateUrl: './filtro-produto.component.html',
  styleUrls: ['./filtro-produto.component.scss']
})
export class FiltroProdutoComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  public itemAtivo(idItem: string): boolean {
    return document.getElementById(idItem).classList.contains('active');
  }
}
