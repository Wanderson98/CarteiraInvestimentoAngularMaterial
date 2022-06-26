import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banco } from '../models/banco';

const httpOptions = {headers: new HttpHeaders({ 'content-Type': 'application/json'})}


@Injectable({
  providedIn: 'root'
})
export class BancoService {

  url = 'https://localhost:7213/api/Bancos';

  constructor(private http: HttpClient) { }

  ListarTodos(): Observable<Banco[]>{
    return this.http.get<Banco[]>(this.url);
  }

   ListarPeloId(bancoId: number): Observable<Banco>{
    const apiUrl = `${this.url}/${bancoId}`;
    return this.http.get<Banco>(apiUrl);
  }

   SalvarBanco(banco: Banco): Observable<any>{
    return this.http.post<Banco>(this.url, banco, httpOptions);
   }

   AtualizarBanco(banco: Banco): Observable<any>{
    const apiUrl = `${this.url}/${banco.bancoId}`;
    return this.http.put<Banco>(apiUrl, banco, httpOptions);
   }

   ExcluirBanco(bancoId: number): Observable<any>{
    const apiUrl = `${this.url}/${bancoId}`;
    return this.http.delete<number>(apiUrl, httpOptions); 
   }
  }
