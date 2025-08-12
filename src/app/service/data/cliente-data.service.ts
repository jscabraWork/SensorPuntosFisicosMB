import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL_PAGOS } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ClienteDataService {

  private apiClientes=`${API_URL_PAGOS}/clientes`;

  constructor(private http: HttpClient) { }

  findByCorreo(correo: string): Observable<any> {
    return this.http.get(`${this.apiClientes}/usuario/${correo}`);
  }

  findByNumeroDocumento(numeroDocumento: string): Observable<any> {
    return this.http.get(`${this.apiClientes}/buscar/${numeroDocumento}`);
  }
}
