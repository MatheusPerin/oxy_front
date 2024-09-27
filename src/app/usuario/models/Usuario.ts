import { publishFacade } from "@angular/compiler";

export interface Usuario {
    id?: bigint,
    nome?: string,
    email?: string,
    telefone?: string,
    dataCadastro?: Date
}