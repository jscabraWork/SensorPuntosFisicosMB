import { HardcodedAutheticationService } from './../../../../service/security/hardcoded-authetication.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseComponent } from '../../../../common-ui/base.component';
import { Orden } from '../../../../models/orden.model';
import { Evento } from '../../../../models/evento.model';
import { Ticket } from '../../../../models/ticket.model';
import { Localidad } from '../../../../models/localidad.model';
import { OrdenDataService } from '../../../../service/data/orden-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MetodoPagoModalComponent } from './metodo-pago-modal/metodo-pago-modal.component';
import { Cliente } from '../../../../models/cliente.model';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent extends BaseComponent {

  orden: Orden = new Orden();
  evento: Evento = new Evento();
  tickets: Ticket[] = [];
  localidad: Localidad | null = null;
  pagar: boolean = false;
  cliente: Cliente = new Cliente();

  override pathVariableName = 'ordenId';

  constructor(
    private service: OrdenDataService,
    private auth: HardcodedAutheticationService,
    public router: Router,
    dialog: MatDialog,
    route: ActivatedRoute
  ){
    super(dialog, route);
  }

  override cargarDatos(): void {
    if (!this.pathVariable) {
      this.mostrarError("ID de orden no válido");
      return;
    }

    this.iniciarCarga();
    this.service.getInformacionCarritoDeCompras(+this.pathVariable).subscribe({
      next: (response) => {
        if (response) {
          this.handleResponse(response);
        } else {
          this.mostrarError("No tienes ninguna orden de compra pendiente");
        }
        this.finalizarCarga();
      },
      error: (err) => {
        this.manejarError(err, "Sucedio un error por favor vuelva a intentar");
      }
    });
  }

  handleResponse(response: any): void {
    this.orden = response.orden;

    if (this.orden.estado !== 3) {
      this.mostrarError("No tienes ninguna orden de compra pendiente");
      this.router.navigate(['/puntosfisicos/eventos']);
      return;
    }

    this.tickets = response.tickets;
    this.evento = response.evento;
    this.localidad = response.localidad;
    this.cliente = response.cliente;
  }


  ptp(): void {
    if (this.pagar) return;

    const dialogRef = this.dialog.open(MetodoPagoModalComponent, {
      width: '500px',
      disableClose: true,
      data: { orden: this.orden }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.confirmado && result?.metodo) {
        this.confirmarPago(result.metodo.id);
      }
    });
  }

  confirmarPago(metodoPago: number): void {
    this.iniciarCarga();
    this.pagar = true;

    this.service.confirmar(this.orden.id, metodoPago).subscribe({
      next: (response) => {
        this.finalizarCarga();
        this.mostrarMensaje('Pago confirmado exitosamente');
        this.volverAEventoPerfil();
        this.pagar = false;
      },
      error: (error) => {
        this.pagar = false;
        this.manejarError(error, 'Error al confirmar el pago');
      }
    });
  }

  cancelarOrden(): void {
    this.confirmar('¿Estás seguro de que deseas cancelar esta orden?').subscribe(confirmado => {
      if (confirmado) {
        this.iniciarCarga();

        this.service.cancelar(this.orden.id).subscribe({
          next: () => {
                    this.pagar = false;
            this.finalizarCarga();
            this.mostrarMensaje('Orden cancelada exitosamente');
            this.volverAEventoPerfil();
          },
          error: (error) => {
                    this.pagar = false;
            this.manejarError(error, 'Error al cancelar la orden');
          }
        });
      }
    });
  }

  private volverAEventoPerfil(): void {
      this.router.navigate(['/taquilla', this.auth.getCC() , 'eventos', 'evento-perfil', this.evento.id]);
  }

  calcularTotalTickets(): number {
    let total = 0;
    const tarifa = this.localidad?.tarifa;
    this.tickets.forEach(ticket => {
      if (tarifa) {
        total += tarifa.precio + tarifa.servicio + tarifa.iva;
      }
    });
    return total;
  }

  get valorTotal(): number {
    return this.calcularTotalTickets();
  }

}
