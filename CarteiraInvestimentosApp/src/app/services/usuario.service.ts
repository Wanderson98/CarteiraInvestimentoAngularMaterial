
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';


const httpOptions ={
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlApi = 'https://localhost:7213/api/Usuarios'
  constructor(private http: HttpClient) { }

  pegarTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlApi, httpOptions)
  }
  pegarPorId(usuarioId: number): Observable<Usuario> {
    const url = `${this.urlApi}/${usuarioId}`;
    return this.http.get<Usuario>(url, httpOptions)
  }
  salvarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlApi, usuario, httpOptions);
  }
  atualizarUsuario(usuario: Usuario): Observable<any> {
    return this.http.put<Usuario>(`${this.urlApi}/${usuario.usuarioId}`,usuario,httpOptions);
  }
  excluirUsuario(usuario:number): Observable<any> {
    const url = `${this.urlApi}/${usuario}`;
    return this.http.delete<number>(url, httpOptions)
  }
}
