import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { puntosfisicosRoutes } from './puntosfisicos.routes';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(puntosfisicosRoutes)

  ]
})
export class PuntosfisicosModule { }
