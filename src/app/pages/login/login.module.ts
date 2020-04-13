import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login.routing.module';
import {FormSignUpComponent} from './form-signup/form-sign-up.component';
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
    FormSignUpComponent,
    FormLoginComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
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
export class LoginModule {
}
