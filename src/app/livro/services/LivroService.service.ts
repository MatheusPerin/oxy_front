import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Livro } from "../models/Livro";

@Injectable({providedIn: 'root'})
export class LivroService {
    private BASE_URL: string = 'http://localhost:8080/livro'

    constructor(private http: HttpClient){}

    public listar(): Observable<Livro[]> {
        return this.http.get<Livro[]>(this.BASE_URL + '/listar')
    }

    public excluir(id: bigint | undefined): Observable<any> {
        return this.http.delete<any>(this.BASE_URL + `/${id}`);
    }

    public salvar(livro: Livro): Observable<Livro> {
        return this.http.post<Livro>(this.BASE_URL, livro, {headers: { 'Content-Type': 'application/json' }});
    }
}