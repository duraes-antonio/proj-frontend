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
    avgRating: number = this.calcAvgRating(this.reviews, 2);
    addresses: Address[] = DataTests.addresses;
    deliveryOpts: DeliveryOption[] = DataTests.deliveryOptions;

    /*TODO: Remover após ter dados em um banco de dados*/
    private _routeSub$: Subscription;
    private _cart$: Subscription;
    private _cartProdIds: number[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private cartStore: Store<Cart>,
        private dialog: MatDialog
    ) {
        this._routeSub$ = route.params.subscribe(
            params => {
              const idProduto = +params['id'];
              const prod = Product2Service.getById(idProduto);

                if (!prod) {
                    router.navigate([routesFrontend.notFound]);
                } else {
                    this.product = prod;
                    this.prodInCart = this._cartProdIds.some(id => id === prod.id);
                }
            });
        this._cart$ = cartStore.subscribe(
            (res: any) => {
                const currProdId = this.product ? this.product.id : 0;
                this._cartProdIds = (res.cart as Cart).productsId;

                if (this._cartProdIds) {
                    this.prodInCart = this._cartProdIds.some(id => id === currProdId);
                }
            });
    }

    ngOnDestroy(): void {
        this._routeSub$.unsubscribe();
        this._cart$.unsubscribe();
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
            ModalAddressComponent.getConfig({
                showInputCEP: true,
                addresses: this.addresses
            })
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

    sliceText(text: string, numTerms: number) {
        return text.split(' ').slice(0, 40).join(' ');
    }

    private calcAvgRating(ratings: Review[], qtdDecimals = 2): number {
        return calcAverage(ratings, (aval: Review) => aval.value, qtdDecimals);
    }
}
