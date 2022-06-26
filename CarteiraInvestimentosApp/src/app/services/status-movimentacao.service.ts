import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusMovimentacao } from '../models/statusMovimentacao';

const httpOptions = {headers: new HttpHeaders({ 'content-Type': 'application/json'})}

@Injectable({
  providedIn: 'root'
})
export class StatusMovimentacaoService {

  url = 'https://localhost:7213/api/StatusMovimentacoes';



  constructor(private http: HttpClient) { }

  ListarTodos(): Observable<StatusMovimentacao[]>{
    return this.http.get<StatusMovimentacao[]>(this.url);
  }

  ListarPeloId(statusMovimentacaoId: number): Observable<StatusMovimentacao>{
    const apiUrl = `${this.url}/${statusMovimentacaoId}`;
    return this.http.get<StatusMovimentacao>(apiUrl);
  }

  SalvarStatusMovimentacao(statusMovimentacao: StatusMovimentacao): Observable<any>{
    return this.http.post<StatusMovimentacao>(this.url, statusMovimentacao, httpOptions);
  }

  AtualizarStatusMovimentacao(statusMovimentacao: StatusMovimentacao): Observable<any>{
    const apiUrl = `${this.url}/${statusMovimentacao.statusMovimentacaoId}`;
    return this.http.put<StatusMovimentacao>(apiUrl, statusMovimentacao, httpOptions);
  }

  ExcluirStatusMovimentacao(statusMovimentacaoId: number): Observable<any>{
    const apiUrl = `${this.url}/${statusMovimentacaoId}`;
    return this.http.delete<StatusMovimentacao>(apiUrl, httpOptions); 
  }
}
