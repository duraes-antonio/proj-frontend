import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {ComponentesModule} from './componentes/componentes.module';
import {CommonModule, registerLocaleData} from '@angular/common';
import {ProdutoModule} from './telas/produto/produto.module';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ComponentesModule,
    ProdutoModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
