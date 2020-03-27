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
import {ProductService} from '../../../services/product.service';
import {calcAverage} from '../../../../shared/utilFunctions';
import {ModalAddressComponent} from '../../../components/modais/modal-address/modal-address.component';
import {ModalShippingMatComponent} from '../../../components/modais/modal-shipping-mat/modal-shipping-mat.component';
import {ModalPaymentMatComponent} from '../../../components/modais/modal-payment-mat/modal-payment-mat.component';

@Component({
  selector: 'app-tela-visualizar-produto',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnDestroy {

  product: Product = new Product('', '', 0);
  deliveryChosen?: DeliveryOption;
  prodInCart = false;

  seqProd = [...DataTests.listProducts][0];
  avaliacoes: Review[] = DataTests.reviews;
  media: number = this.calcAvgRating(this.avaliacoes, 2);
  enderecos: Address[] = DataTests.addresses;
  deliveryOpts: DeliveryOption[] = DataTests.deliveryOptions;

  /*TODO: Remover após ter dados em um banco de dados*/
  private routeSub$: Subscription;
  private cart$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartStore: Store<Cart>,
    private dialog: MatDialog
  ) {
    this.routeSub$ = route.params.subscribe(
      params => {
        const idProduto = +params['id'];
        const prodTemp = ProductService.getById(idProduto);

        if (!prodTemp) {
          router.navigateByUrl('404');
        } else {
          this.product = prodTemp;
        }
      });
    this.cart$ = cartStore.subscribe(
      (res: any) => {
        const currProdId = this.product ? this.product.id : 0;

        if ((res.cart as Cart).productsId) {
          this.prodInCart = (res.cart as Cart).productsId
            .some(id => id === currProdId);
        }
      });
  }

  ngOnDestroy(): void {
    this.routeSub$.unsubscribe();
    this.cart$.unsubscribe();
  }

  showModalShipp(CEP: string) {
    /*TODO: Chamar serviço para calculo de frete*/
    const dialogRef = this.dialog.open(
      ModalShippingMatComponent,
      ModalShippingMatComponent.getConfig({optionsDelivery: this.deliveryOpts})
    );
    dialogRef.componentInstance.action.subscribe(
      (delivery: DeliveryOption) => {
        this.updateChosenDelivery(delivery);
      });
    dialogRef.componentInstance.selectAddress.subscribe(
      () => {
        this.dialog.closeAll();
        this.showModalAdress();
      });
  }

  showModalAdress() {
    const dialogRef = this.dialog.open(
      ModalAddressComponent,
      ModalAddressComponent.getConfig({showInputCEP: true, addresses: this.enderecos})
    );
    dialogRef.componentInstance.action.subscribe(
      (cep: string) => {
        this.dialog.closeAll();
        this.showModalShipp(cep);
      });
  }

  showModalPayments() {
    this.dialog.open(ModalPaymentMatComponent, ModalPaymentMatComponent.getConfig());
  }

  updateChosenDelivery(delivery: DeliveryOption) {
    this.deliveryChosen = delivery;
  }

  addToCart(id: number) {
    this.cartStore.dispatch(Add(id));
  }

  remFromCart(id: number) {
    this.cartStore.dispatch(Remove(id));
  }

  private calcAvgRating(ratings: Review[], qtdDecimals = 2): number {
    return calcAverage(ratings, (aval: Review) => aval.value, qtdDecimals);
  }
}
