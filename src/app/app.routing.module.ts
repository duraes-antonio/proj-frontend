import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {ProductRoutingModule} from './pages/product/product-routing.module';
import {AuthGuard} from './guards/auth.guard';
import {CheckoutRoutingModule} from './pages/checkout/checkout-routing.module';
import {routesFrontend} from '../shared/constants/routes-frontend';
import {Page404Component} from './pages/404/page404.component';
import {ForbiddenRoutingModule} from './pages/forbidden/forbidden-routing.module';
import {OwnerGuard} from './guards/owner.guard';
import {CategoryRoutingModule} from './pages/category/category-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: routesFrontend.home,
    pathMatch: 'full'
  },
  {
    path: routesFrontend.contact,
    loadChildren: () =>
      import('./pages/tela-contato/tela-contato.module')
        .then(m => m.TelaContatoModule)
  },
  {
    path: routesFrontend.cart,
    loadChildren: () =>
      import('./pages/cart/cart.module')
        .then(m => m.CartModule)
  },
  {
    path: routesFrontend.userOrders,
    canActivate: [AuthGuard, OwnerGuard],
    loadChildren: () =>
      import('./pages/order-list/order-list.module')
        .then(m => m.OrderListModule)
  },
  {
    path: routesFrontend.home,
    loadChildren: () =>
      import('./pages/home/home.module')
        .then(m => m.HomeModule)
  },
  {
    path: routesFrontend.login,
    loadChildren: () => import('./pages/login/login.module')
      .then(m => m.LoginModule)
  },
  {
    path: routesFrontend.notFound,
    loadChildren: () =>
      import('./pages/404/page404.module')
        .then(m => m.Page404Module)
  },
  {
    path: '**',
    component: Page404Component,
  }
];

const extraOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled'
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, extraOptions),
    CategoryRoutingModule,
    CheckoutRoutingModule,
    ForbiddenRoutingModule,
    ProductRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
