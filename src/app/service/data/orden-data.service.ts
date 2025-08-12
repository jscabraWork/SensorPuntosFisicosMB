import { Ticket } from './../../models/ticket.model';
import { Injectable } from '@angular/core';
import { API_URL_PAGOS } from '../../app.constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdenDataService {

    private apiOrdenes=`${API_URL_PAGOS}/ordenes`;
    private apiOrdenesTaquilla=`${API_URL_PAGOS}/ordenes-puntosfisicos`;

  constructor(private http: HttpClient) { }

   getInformacionCarritoDeCompras(pIdOrden: number) {
    return this.http.get(`${this.apiOrdenes}/carrito/${pIdOrden}`);
  }

   getRespuestaOrden(pIdOrden: number) {
    return this.http.get<any>(`${this.apiOrdenes}/orden/respuesta/${pIdOrden}`);
  }

  // Métodos para órdenes con promotor
  crearOrdenNoNumerada(cantidad: number, idLocalidad: number, idEvento: number, numeroDocumento: string, taquillaId: string) {
    const params = new HttpParams()
      .set('pCantidad', cantidad.toString())
      .set('pLocalidadId', idLocalidad.toString())
      .set('pEventoId', idEvento.toString())
      .set('pClienteNumeroDocumento', numeroDocumento)
      .set('pPuntoFisicoId', taquillaId);
    return this.http.post<any>(`${this.apiOrdenesTaquilla}/crear-no-numerada`, null, { params });
  }

  crearOrdenNumerada(idEvento: number, numeroDocumento: string, tickets: Ticket[], taquillaId: string) {
    const params = new HttpParams()
      .set('pEventoId', idEvento.toString())
      .set('pClienteNumeroDocumento', numeroDocumento)
      .set('pPuntoFisicoId', taquillaId);
    return this.http.post<any>(`${this.apiOrdenesTaquilla}/crear-numerada`, tickets, { params });
  }

  crearOrdenIndividual(ticketPadreId: number, pCantidad: number, idEvento: number, numeroDocumento: string, taquillaId: string) {
    const params = new HttpParams()
      .set('pEventoId', idEvento.toString())
      .set('pCantidad', pCantidad.toString())
      .set('pTicketPadreId', ticketPadreId.toString())
      .set('pClienteNumeroDocumento', numeroDocumento)
      .set('pPuntoFisicoId', taquillaId);
    return this.http.post<any>(`${this.apiOrdenesTaquilla}/crear-individual`, null, { params });
  }


  confirmar(ordenId: number, metodo: number) {
    const params = new HttpParams()
      .set('pOrdenId', ordenId.toString())
      .set('pMetodo', metodo.toString());
    return this.http.post<any>(`${this.apiOrdenesTaquilla}/confirmar`, null, { params });
  }

  cancelar(ordenId: number) {
    const params = new HttpParams()
      .set('pOrdenId', ordenId.toString());
    return this.http.post<any>(`${this.apiOrdenesTaquilla}/cancelar`, null, { params });
  }
}
