import { HardcodedAutheticationService } from './../../../service/security/hardcoded-authetication.service';
import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { BaseComponent } from '../../../common-ui/base.component';
import { Evento } from '../../../models/evento.model';
import { Dia } from '../../../models/dia.model';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PuntosFisicosDataService } from '../../../service/data/puntosfisicos-data.service';
import { SeleccionLocalidadComponent } from './seleccion-localidad/seleccion-localidad.component';
import { FormsModule } from '@angular/forms';
import { ClienteDataService } from '../../../service/data/cliente-data.service';
import { OrdenDataService } from '../../../service/data/orden-data.service';

@Component({
  selector: 'app-evento-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, SeleccionLocalidadComponent],
  templateUrl: './evento-perfil.component.html',
  styleUrl: './evento-perfil.component.scss'
})
export class EventoPerfilComponent extends BaseComponent {
  
  evento: Evento = new Evento();
  dias: Dia[] = [];
  
  cedula: string = '';
  correo: string = '';
  buscandoCliente: boolean = false;
  clienteSeleccionado: any = null;

  constructor(
    private taquillaService: PuntosFisicosDataService,
    private clienteService: ClienteDataService,
    private ordenService: OrdenDataService,
    private router: Router,
    private autenticacionService: HardcodedAutheticationService,
    dialog: MatDialog,
    route: ActivatedRoute
  ) {
    super(dialog, route);
    this.pathVariableName = 'idEvento';
  }

  protected override cargarDatos(): void {
    if (this.pathVariable) {
      this.iniciarCarga();
      this.taquillaService.getEventoPerfil(+this.pathVariable).subscribe({
        next: (response) => {
          console.log('Evento perfil response:', response);
          this.evento = response.evento;
          this.dias = response.dias.sort((a: Dia, b: Dia) => a.fechaInicio.localeCompare(b.fechaInicio));
          this.finalizarCarga();
        },
        error: (error) => {
          this.manejarError(error, 'Error al cargar el perfil del evento');
        }
      });
    }
  }

  getImagenPrincipal(evento: Evento): string | null {
    if (!evento.imagenes || evento.imagenes.length === 0) {
      return null;
    }

    const imagenPrincipal = evento.imagenes.find(imagen => imagen.tipo === 1);
    return imagenPrincipal?.url || null;
  }

  buscarCliente(): void {
    if (!this.cedula.trim() && !this.correo.trim()) {
      return;
    }

    this.buscandoCliente = true;
    
    // Priorizar búsqueda por cédula si ambos campos tienen valor
    const busqueda$ = this.cedula.trim() 
      ? this.clienteService.findByNumeroDocumento(this.cedula.trim())
      : this.clienteService.findByCorreo(this.correo.trim());

    busqueda$.subscribe({
      next: (response) => {
        if (response) {
          this.clienteSeleccionado = response.cliente;
        } else {
          this.mostrarMensaje('Cliente no encontrado');
        }
        this.buscandoCliente = false;
      },
      error: (error) => {
        this.manejarError(error, 'Error al buscar el cliente');
        this.buscandoCliente = false;
      }
    });
  }

  cambiarCliente(): void {
    this.clienteSeleccionado = null;
    this.cedula = '';
    this.correo = '';
  }

  onComprar(event: {localidad: any, cantidad: number}): void {
    if (!this.clienteSeleccionado) {
      this.mostrarMensaje('Debe seleccionar un cliente antes de realizar la compra');
      return;
    }

    if (!event.localidad || !event.localidad.id) {
      this.mostrarMensaje('Error: No se encontró información de la localidad');
      return;
    }

    console.log(event)

    this.iniciarCarga();
    
    const localidadId = event.localidad.id;
    const eventoId = +this.pathVariable!;
    const numeroDocumento = this.clienteSeleccionado.numeroDocumento;
    const cantidad = event.cantidad;
    const taquillaId = this.autenticacionService.getCC()?.toString() || '';

    this.ordenService.crearOrdenNoNumerada(cantidad, localidadId, eventoId, numeroDocumento, taquillaId)
      .subscribe({
        next: (response) => {
          this.finalizarCarga();
          this.router.navigate(['/taquilla', taquillaId, 'eventos', 'carrito', response.ordenId]);
        },
        error: (error) => {
          this.manejarError(error, 'Error al crear la orden');
        }
      });
  }
}
