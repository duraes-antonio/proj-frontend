'use strict';
import {Component, OnInit} from '@angular/core';
import {Produto} from '../../../models/Produto';
import {DadosTeste} from '../../../../shared/DadosTeste';
import {ProductService} from '../../../services/product.service';
import {MatDialog} from '@angular/material/dialog';
import {ModalProductMatComponent} from '../../../componentes/modais/modal-product-mat/modal-product-mat.component';

@Component({
  selector: 'app-tela-gerencia-produto',
  templateUrl: './tela-gerencia-produto.component.html',
  styleUrls: ['./tela-gerencia-produto.component.scss']
})
export class TelaGerenciaProdutoComponent implements OnInit {

  filter = new FilterProduct();
  products: Produto[] = DadosTeste.produtos;
  productChosen: Produto;
  showModalProduct = false;
  textSearch: string = '';

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  selectProduct(id: number) {
    this.productChosen = ProductService.getById(id);
    const dialogRef = this.dialog.open(ModalProductMatComponent, {
      maxWidth: '650px',
      width: '100%',
      height: '100%',
      maxHeight: '98%',
      id: 'modal',
      data: this.productChosen,
    });
  }

  saveProduct(product: Produto) {
    ProductService.put(product);
  }
}


export class FilterProduct {
  text = '';
  itemsPerPage = 10;
  categoryId: number;
}
