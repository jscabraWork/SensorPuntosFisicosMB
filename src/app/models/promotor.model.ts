import { Generic } from '../service/commons/generic.model';
import { Evento } from './evento.model';

export class PuntoFisico implements Generic {
    id?:string;
    nombre: string = '';
    numeroDocumento: string = '';
    correo: string = '';
    celular: string = '';
    eventos: Evento[] = [];
}
