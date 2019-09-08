import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ComponentesModule} from './componentes/componentes.module';
import {TelasModule} from './telas/telas.module';

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
export class AppModule { }
