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
import {DeliveryOption} from '../../../models/delivery-option';
import {Cart} from '../../../models/cart';
import {Add, Remove} from '../../../actions/cart.action';
import {Product2Service} from '../../../services/product2.service';
import {ModalAddressComponent} from '../../../components/dialogs/modal-address/modal-address.component';
import {ModalShippingMatComponent} from '../../../components/dialogs/modal-shipping-mat/modal-shipping-mat.component';
import {ModalPaymentMatComponent} from '../../../components/dialogs/modal-payment-mat/modal-payment-mat.component';
import {routesFrontend} from '../../../../shared/constants/routesFrontend';
import {CartService} from '../../../services/cart.service';
import {ModalManageReviewComponent} from '../../../components/dialogs/modal-manage-review/modal-manage-review.component';
import {ReviewService} from '../../../services/review.service';
import {AddressService} from '../../../services/address.service';
import {ProductService} from '../../../services/product.service';
import {AuthService} from '../../../services/auth.service';
import {ShippingService} from '../../../services/shipping.service';

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
  reviews: Review[] = [];
  reviewUser?: Review;
  avgRating = 0;
  addresses: Address[] = [];
  showButtonRate = false;

  /*TODO: Remover após ter dados em um banco de dados*/
  private readonly _routeSub$: Subscription;
  private readonly _cart$: Subscription;
  private _cartProdIds: string[] = [];

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _cartStore: Store<Cart>,
    private readonly _dialog: MatDialog,
    private readonly _addressServ: AddressService,
    private readonly _productServ: ProductService,
    private readonly _reviewServ: ReviewService,
    private readonly _shippingServ: ShippingService,
  ) {
    this._routeSub$ = _route.params.subscribe(
      params => {
        const productId = params['id'];
        const prod = Product2Service.getById(productId);

        if (!prod) {
          _router.navigate([routesFrontend.notFound]);
        } else {
          this.product = prod;
          this.avgRating = prod.avgReview;
          this.prodInCart = CartService.containsProduct(prod.id);
        }
        this._reviewServ.get({currentPage: 1, perPage: 10, productId})
          .subscribe((reviews: Review[]) => this.reviews = reviews);

        if (AuthService.isLoggedIn()) {
          this._reviewServ.getByUserProduct(productId, AuthService.userLogged?.id as string)
            .subscribe((review: Review) => this.reviewUser = review);
        }

        this._addressServ.get()
          .subscribe((addresses: Address[]) => this.addresses = addresses);
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
    this._shippingServ.getDeliveryOptions(CEP, [{quantity: 1, productId: this.product.id}])
      .subscribe((deliveryOpts: DeliveryOption[]) => {
        const dialogRef = this._dialog.open(
          ModalShippingMatComponent,
          ModalShippingMatComponent.getConfig({optionsDelivery: deliveryOpts})
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

  showModalReview() {
    const dialogRef = this._dialog.open(
      ModalManageReviewComponent,
      ModalManageReviewComponent.getConfig({
        review: this.reviewUser,
        product: this.product
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
}
