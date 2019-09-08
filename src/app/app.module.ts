import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ComponentesModule} from './componentes/componentes.module';
import {TelasModule} from './telas/telas.module';
import {AppRoutingModule} from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentesModule,
    TelasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
