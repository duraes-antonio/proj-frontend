import {Component, OnDestroy} from '@angular/core';
import {Product} from '../../models/product';
import {Product2Service} from '../../services/product2.service';
import {Store} from '@ngrx/store';
import {Cart} from '../../models/cart.model';
import {Subscription} from 'rxjs';
import {Address} from '../../models/address';
import {DataTests} from '../../../shared/dataTests';
import {Remove} from '../../actions/cart.action';
import {MatDialog} from '@angular/material/dialog';
import {ModalAddressComponent} from '../../components/modais/modal-address/modal-address.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnDestroy {

  productsChosen: Product[] = [];

  totalCost = 0;
  totalShipment = 0;
  userAddresses: Address[] = DataTests.addresses;
  currAddress: Address = this.userAddresses[0];
  prodAmount = new Map<number, number>();

  private cart$: Subscription;

  constructor(
    private cartStore: Store<Cart>,
    public dialog: MatDialog
  ) {
    this.cart$ = this.cartStore.subscribe(
      (res: any) => {
        const ids = (res.cart as Cart).productsId;

        if (ids && ids.length > 0) {
          this.productsChosen = Product2Service.getAll(ids);
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
    // this.currAddress = this.tempAddress;
    // TODO: Calcular custo de entrega
  }

  showModalAdress() {
    let tempAddress: Address;
    const modalAddr = this.dialog.open(
      ModalAddressComponent,
      ModalAddressComponent.getConfig({showInputCEP: false, addresses: this.userAddresses})
    );
    modalAddr.componentInstance.chosenAddress
      .subscribe((addr: Address) => tempAddress = addr);
    modalAddr.componentInstance.action
      .subscribe(() => {
        this.currAddress = tempAddress;
        this.updateChosenDelivery();
      });
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
      .map(p => {
        const amount = this.prodAmount.get(p.id);
        return p.priceWithDiscount * (amount ? amount : 1);
      })
      .reduce((p, c) => p + c);
    this.updateChosenDelivery();
    this.totalShipment = this.productsChosen
      .map(p => {
        const amount = this.prodAmount.get(p.id);
        return p.priceWithDiscount * .1 * (amount ? amount : 1);
      })
      .reduce((p, c) => p + c);
  }
}
