import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/config/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { errorRoute } from './layouts/error/error.route';

import HomeComponent from './home/home.component';
import NavbarComponent from './layouts/navbar/navbar.component';
import LoginComponent from './login/login.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: '/login', // Redirecionar para a tela de login se o caminho for vazio
          pathMatch: 'full',
        },
        {
          path: '',
          component: NavbarComponent,
          outlet: 'navbar',
        },
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module'),
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.route'),
        },
        {
          path: 'home',
          component: HomeComponent,
          canActivate: [UserRouteAccessService],
          title: 'home.title',
        },
        {
          path: 'login',
          component: LoginComponent,
          title: 'login.title',
        },
        {
          path: 'cart',
          component: CartComponent,
          title: 'cart.title',
        },
        {
          path: '',
          loadChildren: () => import(`./entities/entity-routing.module`).then(({ EntityRoutingModule }) => EntityRoutingModule),
        },
        ...errorRoute,
      ],
      { enableTracing: DEBUG_INFO_ENABLED, bindToComponentInputs: true },
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
