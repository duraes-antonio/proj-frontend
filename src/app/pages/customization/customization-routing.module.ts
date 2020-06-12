import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {routesFrontend} from '../../../shared/constants/routes-frontend';
import {AuthGuard} from '../../guards/auth.guard';
import {AdminGuard} from '../../guards/admin.guard';
import {CustomizationComponent} from './customization.component';
import {CustomListProductComponent} from './custom-list-product/custom-list-product.component';
import {CustomListSlideComponent} from './custom-list-slide/custom-list-slide.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard, AdminGuard],
    component: CustomizationComponent,
    path: routesFrontend.customize,
  },
  {
    canActivate: [AuthGuard, AdminGuard],
    component: CustomListProductComponent,
    path: routesFrontend.customizeProductList
  },
  {
    canActivate: [AuthGuard, AdminGuard],
    component: CustomListSlideComponent,
    path: routesFrontend.customizeSlider
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomizationRoutingModule {
}
