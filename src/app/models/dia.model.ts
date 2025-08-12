import { Evento } from "./evento.model"
import { Localidad } from "./localidad.model"

export class Dia {
    id: number = 0;
    nombre: string = '';
    estado: number = 0;
    fechaInicio: string = '';
    fechaFin: string = '';
    horaInicio: string = '';
    horaFin: string = '';
    localidades: Localidad[] = [];
    evento!: Evento;

    
}