import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule} from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {ComponentesModule} from './components/componentes.module';
import {registerLocaleData} from '@angular/common';
import {ProductModule} from './pages/product/product.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from './services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {CheckoutModule} from './pages/checkout/checkout.module';
import {ForbiddenModule} from './pages/forbidden/forbidden.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {CategoryModule} from './pages/category/category.module';
import {OrderModule} from './pages/order/order.module';
import {UserModule} from './pages/user/user.module';

registerLocaleData(localePt);
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CategoryModule,
    CheckoutModule,
    ComponentesModule,
    ForbiddenModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    OrderModule,
    ProductModule,
    UserModule,
    NgxSpinnerModule,
  ],
  providers: [
    AuthService,
    MatDialog,
    MatNativeDateModule,
    MatDatepickerModule,
    {provide: LOCALE_ID, useValue: 'pt'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
