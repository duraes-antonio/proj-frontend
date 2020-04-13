import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {ProductRoutingModule} from './pages/product/product-routing.module';
import {AuthGuard} from './guards/auth.guard';
import {CheckoutRoutingModule} from './pages/checkout/checkout-routing.module';
import {routesFrontend} from '../shared/constants/routesFrontend';

const routesConst = routesFrontend;
const routes: Routes = [
  {
    path: '',
    redirectTo: routesConst.home,
    pathMatch: 'full'
  },
  {
    path: 'contato',
    loadChildren: () =>
      import('./pages/tela-contato/tela-contato.module')
        .then(m => m.TelaContatoModule)
  },
  {
    path: 'carrinho',
    loadChildren: () =>
      import('./pages/cart/cart.module')
        .then(m => m.CartModule)
  },
  {
    path: 'historico-compra',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/tela-historico-compra/tela-historico-compra.module')
        .then(m => m.TelaHistoricoCompraModule)
  },
  {
    path: routesConst.home,
    loadChildren: () =>
      import('./pages/home/home.module')
        .then(m => m.HomeModule)
  },
  {
    path: routesConst.login,
    loadChildren: () => import('./pages/login/login.module')
      .then(m => m.LoginModule)
  },
  {
    path: '404',
    loadChildren: () =>
      import('./pages/404/tela404.module')
        .then(m => m.Tela404Module)
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];

const extraOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled'
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, extraOptions),
    CheckoutRoutingModule,
    ProductRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
