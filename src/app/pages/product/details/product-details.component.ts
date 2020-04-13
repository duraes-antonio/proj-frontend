'use strict';
import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {MatDialog} from '@angular/material/dialog';
import {DataTests} from '../../../../shared/dataTests';
import {Product} from '../../../models/product';
import {Review} from '../../../models/review';
import {Address} from '../../../models/address';
import {DeliveryOption} from '../../../models/deliveryOption';
import {Cart} from '../../../models/cart.model';
import {Add, Remove} from '../../../actions/cart.action';
import {Product2Service} from '../../../services/product2.service';
import {calcAverage} from '../../../../shared/utilFunctions';
import {ModalAddressComponent} from '../../../components/modais/modal-address/modal-address.component';
import {ModalShippingMatComponent} from '../../../components/modais/modal-shipping-mat/modal-shipping-mat.component';
import {ModalPaymentMatComponent} from '../../../components/modais/modal-payment-mat/modal-payment-mat.component';
import {routesFrontend} from '../../../../shared/constants/routesFrontend';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnDestroy {

  product: Product = new Product('', '', 0);
  deliveryChosen?: DeliveryOption;
  prodInCart = false;

  /*TODO: Substituir por requisições*/
  seqProd = [...DataTests.listProducts][0];
  reviews: Review[] = DataTests.reviews;
  avgRating: number = this._calcAvgRating(this.reviews, 2);
  addresses: Address[] = DataTests.addresses;
  deliveryOpts: DeliveryOption[] = DataTests.deliveryOptions;
  showButtonRate = true;

  /*TODO: Remover após ter dados em um banco de dados*/
  private readonly _routeSub$: Subscription;
  private readonly _cart$: Subscription;
  private _cartProdIds: string[] = [];

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _cartStore: Store<Cart>,
    private readonly _dialog: MatDialog
  ) {
    this._routeSub$ = _route.params.subscribe(
      params => {
        const idProduto = +params['id'];
        const prod = Product2Service.getById(idProduto);

        if (!prod) {
          _router.navigate([routesFrontend.notFound]);
        } else {
          this.product = prod;
          this.prodInCart = CartService.containsProduct(prod.id);
        }
      });
    this._cart$ = _cartStore.subscribe(
      (res: any) => {
        const currentProdId = this.product ? this.product.id : '';
        this._cartProdIds = (res.cart as Cart).productsId;
        this.prodInCart = CartService.containsProduct(currentProdId);
      });
  }

  ngOnDestroy(): void {
    this._routeSub$.unsubscribe();
    this._cart$.unsubscribe();
  }

  showModalShipp(CEP: string) {
    /*TODO: Chamar serviço para calculo de frete*/
    const dialogRef = this._dialog.open(
      ModalShippingMatComponent,
      ModalShippingMatComponent.getConfig({optionsDelivery: this.deliveryOpts})
    );
    dialogRef.componentInstance.action.subscribe(
      (delivery: DeliveryOption) => {
        this._updateChosenDelivery(delivery);
      });
    dialogRef.componentInstance.selectAddress.subscribe(
      () => {
        this._dialog.closeAll();
        this.showModalAdress();
      });
  }

  showModalAdress() {
    const dialogRef = this._dialog.open(
      ModalAddressComponent,
      ModalAddressComponent.getConfig({
        showInputCEP: true,
        addresses: this.addresses
      })
    );
    dialogRef.componentInstance.action.subscribe(
      (cep: string) => {
        this._dialog.closeAll();
        this.showModalShipp(cep);
      });
  }

  showModalPayments() {
    this._dialog.open(ModalPaymentMatComponent, ModalPaymentMatComponent.getConfig());
  }

  addToCart(id: string) {
    this._cartStore.dispatch(Add(id));
  }

  remFromCart(id: string) {
    this._cartStore.dispatch(Remove(id));
  }

  sliceText(text: string, numTerms: number) {
    return text.split(' ').slice(0, 40).join(' ');
  }

  buy(product: Product) {
    this.addToCart(product.id);
    CartService.saveOrder([[product, 1]]);
    this._router.navigate([routesFrontend.checkout]);
  }

  private _updateChosenDelivery(delivery: DeliveryOption) {
    this.deliveryChosen = delivery;
  }

  private _calcAvgRating(ratings: Review[], qtdDecimals = 2): number {
    return calcAverage(ratings, (aval: Review) => aval.value, qtdDecimals);
  }
}
