import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dia } from '../../../../models/dia.model';

@Component({
  selector: 'app-seleccion-localidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seleccion-localidad.component.html',
  styleUrl: './seleccion-localidad.component.scss'
})
export class SeleccionLocalidadComponent {

  @Input() dias: Dia[] = [];
  @Output() reservar = new EventEmitter<{localidad: any, tarifa: any, cantidad: number}>();

  cantidades: { [key: string]: number } = {}; // Cantidad por cada combinación localidad-tarifa

  ajustarCantidad(key: string, cambio: number): void {
    const cantidadActual = this.cantidades[key] || 0;
    const nuevaCantidad = cantidadActual + cambio;

    if (nuevaCantidad >= 0 && nuevaCantidad <= 7) {
      // Si se está seleccionando una nueva localidad-tarifa, limpiar las demás
      if (nuevaCantidad > 0 && cantidadActual === 0) {
        this.cantidades = {};
      }

      this.cantidades[key] = nuevaCantidad;

      // Si se reduce a 0, eliminar la entrada
      if (nuevaCantidad === 0) {
        delete this.cantidades[key];
      }
    }
  }

  getCantidad(key: string): number {
    return this.cantidades[key] || 0;
  }

  getItemSeleccionado(): any {
    const keySeleccionado = Object.keys(this.cantidades)[0];
    if (!keySeleccionado) return null;

    return this.getItemsTarifas().find(item => item.key === keySeleccionado);
  }

  getCantidadTotal(): number {
    return Object.values(this.cantidades).reduce((sum, cantidad) => sum + cantidad, 0);
  }

  calcularTotalGeneral(): number {
    const itemSeleccionado = this.getItemSeleccionado();
    if (!itemSeleccionado) return 0;

    return this.getCantidadTotal() * itemSeleccionado.precioTotal;
  }

  getItemsTarifas(): any[] {
    const itemsMap = new Map();

    this.dias.forEach(dia => {
      if (dia.localidades) {
        dia.localidades.forEach(localidad => {
          if (localidad.tarifas && localidad.tarifas.length > 0) {
            localidad.tarifas.forEach(tarifa => {
              // Crear una key única por cada combinación localidad-tarifa
              const key = `${localidad.id}-${tarifa.id}`;

              if (!itemsMap.has(key)) {
                const precioCompleto = tarifa.precio + tarifa.servicio + tarifa.iva;
                itemsMap.set(key, {
                  key: key,
                  localidadId: localidad.id,
                  localidadNombre: localidad.nombre,
                  localidadDescripcion: localidad.descripcion,
                  tarifaId: tarifa.id,
                  tarifaNombre: tarifa.nombre,
                  tarifa: tarifa,
                  dias: [],
                  precioTotal: precioCompleto
                });
              }

              const itemInfo = itemsMap.get(key);
              itemInfo.dias.push({
                dia: dia,
                precio: itemInfo.precioTotal
              });
            });
          }
        });
      }
    });

    return Array.from(itemsMap.values()).sort((a, b) => a.precioTotal - b.precioTotal);
  }

  onReservar(): void {
    if (this.getCantidadTotal() === 0) {
      return;
    }

    const itemSeleccionado = this.getItemSeleccionado();
    this.reservar.emit({
      localidad: { id: itemSeleccionado.localidadId, nombre: itemSeleccionado.localidadNombre },
      tarifa: itemSeleccionado.tarifa,
      cantidad: this.getCantidadTotal()
    });
  }
}
