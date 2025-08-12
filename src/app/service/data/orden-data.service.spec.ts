import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { OrdenDataService } from './orden-data.service';
import { ClientePagos } from '../../models/cliente-pagos.model';

describe('OrdenDataService', () => {
  let service: OrdenDataService;
  let httpMock: HttpTestingController;
  const mockApiUrl = 'http://localhost:8090/api/pagos';
  const mockCliente: ClientePagos = {
    // Define aquí las propiedades mínimas necesarias para la prueba
    numeroDocumento: "1",
    nombre: 'Test Cliente',
    correo:"a@gmail.com",
    tipo_documento:"CC",
    celular:"3000000000"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OrdenDataService,
        { provide: 'API_URL_PAGOS', useValue: mockApiUrl }
      ]
    });

    service = TestBed.inject(OrdenDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('crearOrdenClienteCompra', () => {
    it('should make a POST request with correct parameters and headers', () => {
      const cantidad = 2;
      const idLocalidad = '5';
      const tipo = 1;
      const idEvento = 10;
      const mockResponse = { ordenId: 123, status: 'CREATED' };

      service.crearOrdenClienteCompra(cantidad, idLocalidad, tipo, idEvento, mockCliente)
        .subscribe(response => {
          expect(response).toEqual(mockResponse);
        });

      const req = httpMock.expectOne(
        req => req.url === `${mockApiUrl}/ordenes/crear` &&
               req.method === 'POST'
      );

      expect(req.request.headers.get('Content-Type')).toEqual('application/json');

      expect(req.request.params.get('cantidad')).toEqual(cantidad.toString());
      expect(req.request.params.get('idLocalidad')).toEqual(idLocalidad);
      expect(req.request.params.get('tipo')).toEqual(tipo.toString());
      expect(req.request.params.get('idEvento')).toEqual(idEvento.toString());

      expect(req.request.body).toEqual(mockCliente);

      req.flush(mockResponse);
    });
  });

  describe('getInformacionCarritoDeCompras', () => {
    it('should make a GET request to the correct endpoint', () => {
      const pIdOrden = '123';
      const mockResponse = { items: [], total: 0 };

      service.getInformacionCarritoDeCompras(pIdOrden).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${mockApiUrl}/ordenes/ver/${pIdOrden}`);
      expect(req.request.method).toBe('GET');

      req.flush(mockResponse);
    });
  });

  describe('getRespuestaOrden', () => {
    it('should make a GET request to the correct endpoint', () => {
      const pIdOrden = '456';
      const mockResponse = { status: 'COMPLETED', paymentId: 'pay_123' };

      service.getRespuestaOrden(pIdOrden).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${mockApiUrl}/ordenes/orden/respuesta/${pIdOrden}`);
      expect(req.request.method).toBe('GET');

      req.flush(mockResponse);
    });

    it('should handle errors', () => {
      const pIdOrden = '789';
      const mockError = { status: 404, statusText: 'Not Found' };

      service.getRespuestaOrden(pIdOrden).subscribe(
        () => fail('should have failed'),
        error => expect(error.status).toEqual(404)
      );

      const req = httpMock.expectOne(`${mockApiUrl}/ordenes/orden/respuesta/${pIdOrden}`);
      req.flush('Error', mockError);
    });
  });
});
