import { publishFacade } from "@angular/compiler";

export interface Livro {
    id?: bigint,
    titulo?: string,
    autor?: string,
    isbn?: string,
    dataPublicacao?: Date,
    categoria?: string
}