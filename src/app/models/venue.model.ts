import { Ciudad } from "./ciudad.model"
import { Evento } from "./evento.model"

export class Venue {
    id: number = 0;
    nombre: string = '';
    urlMapa: string = '';
    ciudad!: Ciudad;
    aforo: number = 0;
    eventos: Evento[] = [];
}
