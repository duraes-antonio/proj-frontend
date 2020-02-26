import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TelaLoginComponent} from './tela-login.component';
import {TelaLoginRoutingModule} from './tela-login.routing.module';
import {FormCadClienteComponent} from './form-cad-cliente/form-cad-cliente.component';
import {FormLoginComponent} from './form-login/form-login.component';
import {ComponentesModule} from '../../components/componentes.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {AuthService} from '../../services/auth.service';

@NgModule({
  declarations: [
    FormCadClienteComponent,
    FormLoginComponent,
    TelaLoginComponent
  ],
  imports: [
    CommonModule,
    TelaLoginRoutingModule,
    ComponentesModule,
    MatTabsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule
  ],
  providers: [AuthService]
})
export class TelaLoginModule {
}
