import { Routes } from '@angular/router';
import { PuntosfisicosComponent } from './puntosfisicos.component';
import { EventosComponent } from './eventos/eventos.component';
import { EventoPerfilComponent } from './eventos/evento-perfil/evento-perfil.component';

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
        path: 'historial',
        component: EventosComponent
      },
      {
        path: 'perfil',
        component: EventosComponent
      },
      { path: '', redirectTo: 'eventos', pathMatch: 'full' },
    ]
  }
];
