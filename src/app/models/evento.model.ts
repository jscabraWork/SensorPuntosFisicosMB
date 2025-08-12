import { Dia } from "./dia.model"
import { Imagen } from "./imagen";
import { Tipo } from "./tipo.model";
import { Venue } from "./venue.model";

export class Evento {
    id: number = 0;
    pulep: string = '';
    artistas: string = '';
    nombre: string = '';
    recomendaciones: string = '';
    video: string = '';
    fechaApertura: Date = new Date();
    estado: number = 0;
    venue: Venue | null = null;
    dias: Dia[] = [];
    tipo: Tipo | null = null;
    imagenes: Imagen[] = [];
}