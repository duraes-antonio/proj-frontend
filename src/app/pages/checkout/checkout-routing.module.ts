import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CheckoutComponent} from './checkout.component';
import {routesFrontend} from '../../../shared/constants/routes-frontend';
import {AuthGuard} from '../../guards/auth.guard';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: CheckoutComponent,
    path: routesFrontend.checkout
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule {
}
