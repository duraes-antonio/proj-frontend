import {Component, OnDestroy} from '@angular/core';
import {Product} from '../../models/product';
import {Product2Service} from '../../services/product2.service';
import {Store} from '@ngrx/store';
import {Cart} from '../../models/cart.model';
import {Subscription} from 'rxjs';
import {Address} from '../../models/address';
import {Remove} from '../../actions/cart.action';
import {MatDialog} from '@angular/material/dialog';
import {ModalAddressComponent} from '../../components/modais/modal-address/modal-address.component';
import {AddressService} from '../../services/address.service';
import {take} from 'rxjs/operators';
import {routesFrontend} from '../../../shared/constants/routesFrontend';
import {ShippingService} from '../../services/shipping.service';
import {DeliveryOption} from '../../models/deliveryOption';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnDestroy {

  totalCostProducts = 0;
  totalCostShipment = 0;
  productsChosen: Product[] = [];
  userAddresses: Address[] = [];
  currentAddress?: Address;
  prodAmount = new Map<string, number>();
  routes = routesFrontend;
  private cart$: Subscription;

  constructor(
    private _cartStore: Store<Cart>,
    private _addressServ: AddressService,
    private _dialog: MatDialog,
    private _shippingServ: ShippingService
  ) {
    this.cart$ = this._cartStore.subscribe(
      (res: any) => {
        const ids = (res.cart as Cart).productsId;

        if (ids && ids.length) {
          this.productsChosen = Product2Service.getAll(ids);
          this.productsChosen.map(p => this.prodAmount.set(p.id, 1));
          this.updateCost();
        }
      });
    if (AuthService.isLoggedIn()) {
      this._addressServ
        .get()
        .pipe(take(1))
        .subscribe((addresses: Address[]) => {
          if (addresses.length) {
            this.userAddresses = addresses;
            this.currentAddress = addresses[0];
            this.calculateCostShipping(this.currentAddress.zipCode, this.prodAmount);
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.cart$.unsubscribe();
  }

  showModalAdress() {
    let tempAddress: Address;
    const modalAddr = this._dialog.open(
      ModalAddressComponent,
      ModalAddressComponent.getConfig({showInputCEP: false, addresses: this.userAddresses})
    );
    modalAddr.componentInstance.chosenAddress
      .subscribe((addr: Address) => tempAddress = addr);
    modalAddr.componentInstance.action
      .subscribe(() => {
        this.currentAddress = tempAddress;
        this.calculateCostShipping(this.currentAddress.zipCode, this.prodAmount);
      });
  }

  removeFromCart(id: string) {
    this._cartStore.dispatch(Remove(id));
  }

  changeAmount(idProduct: string, amount: number) {
    this.prodAmount.set(idProduct, amount);
    this.updateCost();
  }

  private calculateCostShipping(
    cep: string, mapProductIdQuantity: Map<string, number>
  ): void {
    const prodIdQuantity = Array.from(mapProductIdQuantity)
      .map((pairIdQuantity: [string, number]) => {
        return {productId: pairIdQuantity[0], amount: pairIdQuantity[1]};
      });
    this._shippingServ.calculateShippingCostDays(cep, prodIdQuantity)
      .pipe(take(1))
      .subscribe((deliveryOpt: DeliveryOption) => {
        this.totalCostShipment = deliveryOpt.cost;
      });
  }

  private updateCost() {
    this.totalCostProducts = this.productsChosen
      .map(p => {
        const amount = this.prodAmount.get(p.id);
        return p.priceWithDiscount * (amount ?? 1);
      })
      .reduce((p, c) => p + c);

    if (this.currentAddress) {
      this.calculateCostShipping(this.currentAddress.zipCode, this.prodAmount);
    }
  }
}
