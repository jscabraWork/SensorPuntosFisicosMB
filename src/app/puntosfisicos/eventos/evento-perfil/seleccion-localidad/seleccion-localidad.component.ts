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
  @Output() reservar = new EventEmitter<{localidad: any, cantidad: number}>();
  
  cantidades: { [key: string]: number } = {}; // Cantidad por cada localidad

  ajustarCantidad(nombreLocalidad: string, cambio: number): void {
    const cantidadActual = this.cantidades[nombreLocalidad] || 0;
    const nuevaCantidad = cantidadActual + cambio;
    
    if (nuevaCantidad >= 0 && nuevaCantidad <= 7) {
      // Si se está seleccionando una nueva localidad, limpiar las demás
      if (nuevaCantidad > 0 && cantidadActual === 0) {
        this.cantidades = {};
      }
      
      this.cantidades[nombreLocalidad] = nuevaCantidad;
      
      // Si se reduce a 0, eliminar la entrada
      if (nuevaCantidad === 0) {
        delete this.cantidades[nombreLocalidad];
      }
    }
  }

  getCantidad(nombreLocalidad: string): number {
    return this.cantidades[nombreLocalidad] || 0;
  }

  getLocalidadSeleccionada(): any {
    const nombreSeleccionado = Object.keys(this.cantidades)[0];
    if (!nombreSeleccionado) return null;
    
    return this.getLocalidadesUnicas().find(loc => loc.nombre === nombreSeleccionado);
  }

  getCantidadTotal(): number {
    return Object.values(this.cantidades).reduce((sum, cantidad) => sum + cantidad, 0);
  }

  calcularTotalGeneral(): number {
    const localidadSeleccionada = this.getLocalidadSeleccionada();
    if (!localidadSeleccionada) return 0;
    
    return this.getCantidadTotal() * localidadSeleccionada.precioTotal;
  }

  getLocalidadesUnicas(): any[] {

    const localidadesMap = new Map();
    
    this.dias.forEach(dia => {
      if (dia.localidades) {
        dia.localidades.forEach(localidad => {
          if (localidad.tarifa !== null && localidad.tarifa !== undefined) {
            const key = localidad.nombre;
            if (!localidadesMap.has(key)) {
              localidadesMap.set(key, {
                id: localidad.id,
                nombre: localidad.nombre,
                descripcion: localidad.descripcion,
                dias: [],
                precioTotal: 0
              });
            }
            
            const localidadInfo = localidadesMap.get(key);
            const precioCompleto = localidad.tarifa.precio + localidad.tarifa.servicio + localidad.tarifa.iva;
            
            localidadInfo.dias.push({
              dia: dia,
              precio: precioCompleto,
              tarifa: localidad.tarifa
            });
            
            // El precio total es el mismo sin importar cuántos días (no se suma)
            localidadInfo.precioTotal = precioCompleto;
          }
        });
      }
    });
    
    return Array.from(localidadesMap.values()).sort((a, b) => a.precioTotal - b.precioTotal);
  }

  onReservar(): void {
    if (this.getCantidadTotal() === 0) {
      return;
    }
    
    const localidadSeleccionada = this.getLocalidadSeleccionada();
    this.reservar.emit({
      localidad: localidadSeleccionada,
      cantidad: this.getCantidadTotal()
    });
  }
}
