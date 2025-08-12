import { Routes } from '@angular/router';
import { PuntosfisicosComponent } from './puntosfisicos.component';
import { EventosComponent } from './eventos/eventos.component';
import { EventoPerfilComponent } from './eventos/evento-perfil/evento-perfil.component';
import { CarritoComponent } from './eventos/evento-perfil/carrito/carrito.component';

export const puntosfisicosRoutes: Routes = [
  {
    path: '',
    component: PuntosfisicosComponent,
    children: [
      {
        path: 'eventos',
        component: EventosComponent
      },
      {
        path: 'eventos/evento-perfil/:idEvento',
        component: EventoPerfilComponent
      },
      {
        path: 'perfil',
        component: EventosComponent
      },
      {
        path: 'eventos/carrito/:ordenId',
        component: CarritoComponent
      },
      { path: '', redirectTo: 'eventos', pathMatch: 'full' },
    ]
  }
];
