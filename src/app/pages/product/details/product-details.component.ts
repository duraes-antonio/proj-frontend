'use strict';
import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {Product} from '../../../models/product';
import {Review} from '../../../models/review';
import {Address} from '../../../models/address';
import {ModalAddressComponent} from '../../../components/dialogs/modal-address/modal-address.component';
import {ModalShippingMatComponent} from '../../../components/dialogs/modal-shipping-mat/modal-shipping-mat.component';
import {ModalPaymentMatComponent} from '../../../components/dialogs/modal-payment-mat/modal-payment-mat.component';
import {routesFrontend} from '../../../../shared/constants/routes-frontend';
import {CartService} from '../../../services/cart.service';
import {ModalManageReviewComponent} from '../../../components/dialogs/modal-manage-review/modal-manage-review.component';
import {ReviewService} from '../../../services/review.service';
import {AddressService} from '../../../services/address.service';
import {ProductService} from '../../../services/product.service';
import {AuthService} from '../../../services/auth.service';
import {ShippingService} from '../../../services/shipping.service';
import {OrderService} from '../../../services/order.service';
import {ListProduct} from '../../../models/componentes/list-product';
import {ListProductService} from '../../../services/lists/list-product.service';
import {DeliveryOption} from '../../../models/shipping/delivery';
import {EReviewSort} from '../../../models/filters/filter-review';
import {util} from '../../../../shared/util';
import {NgxSpinnerService} from 'ngx-spinner';
import {utilDOM} from "../../../../shared/util.dom";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements AfterViewInit, OnDestroy {

  product?: Product;
  deliveryChosen?: DeliveryOption;
  prodInCart = false;

  productsRelatedsList?: ListProduct;
  reviews: Review[] = [];
  reviewUser?: Review;
  avgRating = 0;
  addresses: Address[] = [];
  showButtonRate = false;
  readonly util = util;
  private readonly _routeSub$: Subscription;
  private readonly _cart$: Subscription;
  private _cartProdIds: string[] = [];
  requesting = false;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _dialog: MatDialog,
    private readonly _addressServ: AddressService,
    private readonly _listProductServ: ListProductService,
    private readonly _loadingServ: NgxSpinnerService,
    private readonly _orderServ: OrderService,
    private readonly _productServ: ProductService,
    private readonly _reviewServ: ReviewService,
    private readonly _shippingServ: ShippingService,
  ) {
    this._loadingServ.show();
    this.requesting = true;
    this._routeSub$ = _route.params.subscribe(
      params => {
        const productId = params['id'];
        const reviewsGet$ = _reviewServ.get({
          currentPage: 1,
          perPage: 10,
          productId,
          sortBy: EReviewSort.NEWEST
        });
        const productGet$ = _productServ.getById(productId);
        const prodRelatedList$ = _listProductServ.getRelateds(productId);
        const observables: Observable<any>[] = [
          productGet$, reviewsGet$, prodRelatedList$
        ];

        if (AuthService.isLoggedIn()) {
          observables.push(_addressServ.get());
          observables.push(_reviewServ.getByUserProduct(productId, AuthService.userLogged?.id as string));
          observables.push(_orderServ.productPurchased(productId, AuthService.userLogged?.id as string));
        }

        forkJoin(observables)
          .subscribe((res: any[]) => {
            if (!res[0]) {
              _router.navigate([routesFrontend.notFound]);
            } else {
              this.product = res[0];
              this.avgRating = this.product?.avgReview ?? 0;
              this.prodInCart = CartService.containsProduct(this.product?.id as string);
            }
            this.reviews = res[1];
            this.productsRelatedsList = res[2];
            this.addresses = res[3];
            this.reviewUser = res[4];
            this.showButtonRate = res[5];
            this.requesting = false;
          });
      });
    this._cart$ = CartService.productIds$.subscribe(
      (ids: string[]) => {
        const currentProdId = this.product ? this.product.id : '';
        this._cartProdIds = ids;
        this.prodInCart = CartService.containsProduct(currentProdId);
      });
  }

  ngOnDestroy(): void {
    this._routeSub$.unsubscribe();
    this._cart$.unsubscribe();
  }

  ngAfterViewInit() {
    utilDOM.setBodyBackgroundColor('white');
  }

  showModalShipp(zipcode: string) {
    const dialogRef = this._dialog.open(
      ModalShippingMatComponent,
      ModalShippingMatComponent.getConfig({
        zipcode,
        items: [
          {quantity: 1, productId: this.product?.id as string}
        ]
      })
    );
    dialogRef.componentInstance.action.subscribe(
      (delivery: DeliveryOption) => {
        this._updateChosenDelivery(delivery);
      });
    dialogRef.componentInstance.selectAddress.subscribe(
      () => {
        this._dialog.closeAll();
        this.showModalAddress();
      });
  }

  showModalAddress() {
    const dialogRef = this._dialog.open(
      ModalAddressComponent,
      ModalAddressComponent.getConfig({
        showInputCEP: true,
        addresses: this.addresses
      })
    );
    dialogRef.componentInstance.action.subscribe(
      (zipcode: string) => {
        this._dialog.closeAll();
        this.showModalShipp(zipcode);
      });
  }

  showModalReview() {
    const dialogRef = this._dialog.open(
      ModalManageReviewComponent,
      ModalManageReviewComponent.getConfig({
        review: this.reviewUser,
        product: this.product as Product
      })
    );
    dialogRef.componentInstance.action.subscribe(() => dialogRef.close());
  }

  showModalPayments() {
    this._dialog.open(ModalPaymentMatComponent, ModalPaymentMatComponent.getConfig());
  }

  addToCart(id: string) {
    CartService.addProducts(id);
  }

  remFromCart(id: string) {
    CartService.removeProduct(id);
  }

  sliceText(text: string, numTerms: number) {
    return text.split(' ').slice(0, numTerms).join(' ');
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
