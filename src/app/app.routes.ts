
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';

import { Routes } from '@angular/router';
import { RouteGuardService } from './service/security/route-guard/rout-guard.service';

export const routes: Routes = [

  {
    path: 'taquilla/:idPunto',
    loadChildren: () =>
      import('./puntosfisicos/puntosfisicos.module').then((m) => m.PuntosfisicosModule),
    canActivate: [RouteGuardService],
  },

  {
    path: '',
    component: LoginComponent,
  },{
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [RouteGuardService],
  },

  {
    path: '**',
    component: ErrorComponent,
  },
];
