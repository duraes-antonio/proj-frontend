import {Component, OnDestroy, OnInit} from '@angular/core';
import {Produto} from '../../models/Produto';
import {ProductService} from '../../services/product.service';
import {Store} from '@ngrx/store';
import {Cart} from '../../models/cart.model';
import {Subscription} from 'rxjs';
import {Endereco} from '../../models/Endereco';
import {DadosTeste} from '../../../shared/DadosTeste';
import {Remove} from '../../actions/cart.action';
import {MatDialog} from '@angular/material/dialog';
import {ModalAddressComponent} from '../../componentes/modais/modal-address/modal-address.component';

@Component({
  selector: 'app-tela-carrinho',
  templateUrl: './tela-carrinho.component.html',
  styleUrls: ['./tela-carrinho.component.scss']
})
export class TelaCarrinhoComponent implements OnInit, OnDestroy {

  productsChosen: Produto[] = [];

  totalCost = 0;
  totalShipment = 0;
  userAddresses: Endereco[] = DadosTeste.enderecos;
  currAddress: Endereco = this.userAddresses[0];
  tempAddress: Endereco;
  prodAmount = new Map<number, number>();

  private cart$: Subscription;

  constructor(
    private cartStore: Store<Cart>,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.cart$ = this.cartStore.subscribe(
      (res: any) => {
        const ids = (res.cart as Cart).productsId;

        if (ids && ids.length > 0) {
          this.productsChosen = ProductService.getAll(ids);
          this.productsChosen
            .map(p => this.prodAmount.set(p.id, 1));
          this.updateCost();
        }
      });
  }

  ngOnDestroy(): void {
    this.cart$.unsubscribe();
  }

  updateChosenDelivery() {
    this.currAddress = this.tempAddress;
    // TODO: Calcular custo de entrega
  }

  showModalAdress() {
    const modalAddr = this.dialog.open(
      ModalAddressComponent,
      ModalAddressComponent.getConfig({showInputCEP: false, addresses: this.userAddresses})
    );
    modalAddr.componentInstance.chosenAddress
      .subscribe((addr: Endereco) => this.tempAddress = addr);
    modalAddr.componentInstance.action
      .subscribe(() => this.currAddress = this.tempAddress);
  }

  removeFromCart(id: number) {
    this.cartStore.dispatch(Remove(id));
  }

  changeAmount(idProduct: number, amount: number) {
    this.prodAmount.set(idProduct, amount);
    this.updateCost();
  }

  private updateCost() {
    this.totalCost = this.productsChosen
      .map(p => p.precoComDesc * this.prodAmount.get(p.id))
      .reduce((p, c) => p + c);
    this.totalShipment = this.productsChosen
      .map(p => p.precoComDesc * .1 * this.prodAmount.get(p.id))
      .reduce((p, c) => p + c);
  }
}
