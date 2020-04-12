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
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnDestroy {

  totalCostProducts = 0;
  totalCostShipping = 0;
  productsChosen: Product[] = [];
  userAddresses: Address[] = [];
  currentAddress?: Address;
  prodAmount = new Map<Product, number>();
  routes = routesFrontend;
  private _cart$: Subscription;
  private _modalSelect$?: Subscription;

  constructor(
    private _cartStore: Store<Cart>,
    private _addressServ: AddressService,
    private _dialog: MatDialog,
    private _shippingServ: ShippingService
  ) {
    // Inscreva-se p/ receber atualizações do carrinho
    this._cart$ = this._cartStore.subscribe(
      (res: any) => {
        const ids = (res.cart as Cart).productsId;

        /*Se no carrinho houver ids de produtos, então busque eles no banco
        * e atualize os custos do carrinho*/
        if (ids && ids.length) {
          this.productsChosen = Product2Service.getAll(ids);
          this.productsChosen.forEach(p => this.prodAmount.set(p, 1));
          this.updateCost();
        }
      });

    // Se o usuário estiver logado, obtenha seus endereços e definar um p/ entrega
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
    this._cart$.unsubscribe();
    this._modalSelect$?.unsubscribe();
  }

  showModalAdress() {
    let tempAddress: Address;
    const modalAddr = this._dialog.open(
      ModalAddressComponent,
      ModalAddressComponent.getConfig({showInputCEP: false, addresses: this.userAddresses})
    );
    this._modalSelect$ = modalAddr.componentInstance.chosenAddress
      .subscribe((addr: Address) => tempAddress = addr);
    modalAddr.componentInstance.action
      .pipe(take(1))
      .subscribe(() => {
        this.currentAddress = tempAddress;
        this.calculateCostShipping(this.currentAddress.zipCode, this.prodAmount);
      });
  }

  removeFromCart(id: string) {
    this._cartStore.dispatch(Remove(id));
  }

  changeAmount(product: Product, amount: number) {
    this.prodAmount.set(product, amount);
    this.updateCost();
  }

  saveOrder() {
    if (this.prodAmount.size) {
      CartService.saveOrder(
        Array.from(this.prodAmount).map((pair: [Product, number]) => pair),
        this.currentAddress?.id
      );
    }
  }

  private calculateCostShipping(cep: string, mapProdQuantity: Map<Product, number>) {
    const prodIdQuantity = Array.from(mapProdQuantity)
      .map((pairIdQuantity: [Product, number]) => {
        return {productId: pairIdQuantity[0].id, quantity: pairIdQuantity[1]};
      });
    this._shippingServ.calculateCostDays(cep, prodIdQuantity)
      .pipe(take(1))
      .subscribe((deliveryOpt: DeliveryOption) => {
        this.totalCostShipping = deliveryOpt.cost;
      });
  }

  private updateCost() {
    this.totalCostProducts = ProductService.calculateCostFromArray(
      Array.from(this.prodAmount)
        .map((productQuantity: [Product, number]) => productQuantity)
    );

    if (this.currentAddress) {
      this.calculateCostShipping(this.currentAddress.zipCode, this.prodAmount);
    }
  }
}
