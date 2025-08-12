import { Cliente } from "./cliente.model";
import { Localidad } from "./localidad.model";
import { Seguro } from "./seguro.model";
import { Servicio } from "./servicio.model";
import { Tarifa } from "./tarifa.model";

export class Ticket {
  id: number = 0;
  // 0: DISPONIBLE, 1: VENDIDO, 2: RESERVADO, 3: EN PROCESO, 4: NO DISPONIBLE
  estado: number = 0;
  // 0: TICKET COMPLETO, 1: TICKET MASTER DE PALCOS INDIVIDUALES
  tipo: number = 0;
  numero: string = '';
  asientos: Ticket[] = [];  // Relación Master-Slave: Master
  palco: Ticket | null = null;      // Relación Master-Slave: Slave reference to Master
  cliente: Cliente | null = null;
  seguro: Seguro | null = null;
  tarifa: Tarifa | null = null;
  localidad: Localidad | null = null;
  personasPorTicket: number = 1;
}
