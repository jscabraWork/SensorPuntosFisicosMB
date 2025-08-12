
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HardcodedAutheticationService {
  constructor(private http: HttpClient) {}


  getUsuario() {
    return sessionStorage.getItem('usuario');
  }

  getCC() {
    return sessionStorage.getItem('cc');
  }
  getNombre() {
    return sessionStorage.getItem('nombre');
  }

  getPuntoFisico() {
    return sessionStorage.getItem('puntofisico');
  }

  usuarioLoggin() {
    let usuario = sessionStorage.getItem('usuario');
    return !(usuario == null);
  }

  puntofisicoLoggin() {
    let usuario = sessionStorage.getItem('puntofisico');
    return !(usuario == null);
  }

  logout() {
    sessionStorage.removeItem('usuarioEntidad');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('puntofisico');
  }
}
