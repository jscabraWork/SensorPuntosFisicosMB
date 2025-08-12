import { Cliente } from "./cliente.model";
import { Evento } from "./evento.model";
import { Seguro } from "./seguro.model";
import { Tarifa } from "./tarifa.model";
import { Ticket } from "./ticket.model";

// Enum para estados de orden
export enum EstadoOrden {
  ACEPTADA = 1,
  RECHAZADA = 2,
  EN_PROCESO = 3,
  DEVOLUCION = 4,
  FRAUDE = 5,
  UPGRADE = 6
}


// Interface para transacciones (tipo any se reemplaza por interface específica)
export interface Transaccion {
  id?: number;
  valor?: number;
  fecha?: Date;
  estado?: string;
  metodo?: string;
}

export class Orden {
  id: number;
  estado: EstadoOrden;
  tipo: number;
  evento: Evento;
  valorOrden: number;
  transacciones: Transaccion[];
  tickets: Ticket[];
  cliente: Cliente;
  creationDate: Date;
  valorSeguro: number;
  tarifa: Tarifa;
  idTRXPasarela: number;
  descripcion?: string;

  constructor() {
    this.id = 0;
    this.estado = EstadoOrden.EN_PROCESO;
    this.tipo = 1;
    this.evento = new Evento();
    this.valorOrden = 0;
    this.transacciones = [];
    this.tickets = [];
    this.cliente = new Cliente();
    this.creationDate = new Date();
    this.valorSeguro = 0;
    this.tarifa = new Tarifa();
    this.idTRXPasarela = 0;
  }
}
