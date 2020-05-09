import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule} from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {ComponentesModule} from './components/componentes.module';
import {registerLocaleData} from '@angular/common';
import {ProductModule} from './pages/product/product.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from './services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {CheckoutModule} from './pages/checkout/checkout.module';
import {ForbiddenModule} from './pages/forbidden/forbidden.module';
import {NgxSpinnerModule} from 'ngx-spinner';

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
    ForbiddenModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ProductModule,
    NgxSpinnerModule,
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
