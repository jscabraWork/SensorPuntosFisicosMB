import { Evento } from "./evento.model"
import { Localidad } from "./localidad.model"

export class Tarifa {
    id: number = 0;
    nombre: string = '';
    precio: number = 0;
    servicio: number = 0;
    iva: number = 0;
    estado: number = 0;
    localidad!: Localidad;
}