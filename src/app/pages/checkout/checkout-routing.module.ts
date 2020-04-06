import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CheckoutComponent} from './checkout.component';
import {routesFrontend} from '../../../shared/constants/routesFrontend';

const routes: Routes = [
  {
    path: routesFrontend.checkout,
    component: CheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule {
}
