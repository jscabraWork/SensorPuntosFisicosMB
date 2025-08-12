import { TipoDocumento } from "./tipo-documento.model";

export class Usuario {
    nombre: string = '';
    numeroDocumento: string = '';
    tipoDocumento: TipoDocumento = new TipoDocumento();
    usuario: string = '';
    correo:string = '';
    contrasena: string = '';
    celular:string = '';
    tipo: string = '';
    roles: string[] = [];
    enabled:boolean = true;
}