import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../models/Usuario";

@Injectable({providedIn: 'root'})
export class UsuarioService {
    private BASE_URL: string = 'http://localhost:8080/usuario'

    constructor(private http: HttpClient){}

    public listar(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.BASE_URL + '/listar')
    }

    public excluir(id: bigint | undefined): Observable<any> {
        return this.http.delete<any>(this.BASE_URL + `/${id}`);
    }

    public salvar(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this.BASE_URL, usuario, {headers: { 'Content-Type': 'application/json' }});
    }
}