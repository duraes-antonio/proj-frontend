import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {ComponentesModule} from './components/componentes.module';
import {registerLocaleData} from '@angular/common';
import {ProdutoModule} from './pages/product/produto.module';
import {StoreModule} from '@ngrx/store';
import {cartReducer} from './reducers/cart.reducer';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from './services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {CheckoutModule} from './pages/checkout/checkout.module';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CheckoutModule,
    ComponentesModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ProdutoModule,
    StoreModule.forRoot({
      cart: cartReducer
    })
  ],
  providers: [
    AuthService,
    MatDialog,
    MatNativeDateModule,
    MatDatepickerModule,
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
