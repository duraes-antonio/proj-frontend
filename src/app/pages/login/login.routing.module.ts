import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';
import {FormLoginComponent} from './form-login/form-login.component';
import {FormSignUpComponent} from './form-signup/form-sign-up.component';

const telaLoginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {path: 'entrar', component: FormLoginComponent},
      {path: 'cadastrar', component: FormSignUpComponent},
      {path: '', redirectTo: 'entrar', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(telaLoginRoutes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
