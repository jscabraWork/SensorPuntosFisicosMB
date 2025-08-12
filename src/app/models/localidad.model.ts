import { Dia } from "./dia.model"
import { Tarifa } from "./tarifa.model"

export class Localidad {
    id: number = 0;
    nombre: string = '';
    estado: number = 0;
    aporte_minimo: number = 0;
    tipo: number = 0;
    descripcion: string = '';
    tarifas: Tarifa[] = [];
    dias: Dia[] = [];

    tarifa: Tarifa = new Tarifa();

}