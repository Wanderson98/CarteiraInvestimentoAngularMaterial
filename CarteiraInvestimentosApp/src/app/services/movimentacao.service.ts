import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movimentacao } from '../models/movimentacao';

const httpOptions = {headers: new HttpHeaders({ 'content-Type': 'application/json'})}


@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  urlMov = 'https://localhost:7213/api/Movimentacoes';
  urlPoup = 'https://localhost:7213/api/Movimentacoes/poup';
  urlRendaF = 'https://localhost:7213/api/Movimentacoes/rendaFixa';
  urlRendaV = 'https://localhost:7213/api/Movimentacoes/rendaVariavel';
  urlTesouro = 'https://localhost:7213/api/Movimentacoes/tesouro';

  constructor(private http: HttpClient) { }

  ListarTodos(): Observable<Movimentacao[]>{
    return this.http.get<Movimentacao[]>(this.urlMov);
  }

  MovimentacaoPeloId(movimentacaoId: number): Observable<Movimentacao>{
    const apiUrl = `${this.urlMov}/${movimentacaoId}`;
    return this.http.get<Movimentacao>(apiUrl);
  }

  PoupancaPeloId(poupancaId: number): Observable<Movimentacao>{
    const apiUrl = `${this.urlPoup}/${poupancaId}`;
    return this.http.get<Movimentacao>(apiUrl);
  }

  RendaFixaPeloId(rendaFixaId: number): Observable<Movimentacao>{
    const apiUrl = `${this.urlRendaF}/${rendaFixaId}`;
    return this.http.get<Movimentacao>(apiUrl);
  }

  RendaVariavelPeloId(rendaVariavelId: number): Observable<Movimentacao>{
    const apiUrl = `${this.urlRendaV}/${rendaVariavelId}`;
    return this.http.get<Movimentacao>(apiUrl);
  }

  TesouroPeloId(tesouroDiretoId: number): Observable<Movimentacao>{
    const apiUrl = `${this.urlTesouro}/${tesouroDiretoId}`;
    return this.http.get<Movimentacao>(apiUrl);
  }

  Salvarmovimentacao(movimentacao: Movimentacao): Observable<any>{
    return this.http.post<Movimentacao>(this.urlMov, movimentacao, httpOptions);
  }

  Atualizarmovimentacao(movimentacao: Movimentacao): Observable<any>{
    const apiUrl = `${this.urlMov}/${movimentacao.movimentacaoId}`;
    return this.http.put<Movimentacao>(apiUrl, movimentacao, httpOptions);
  }

  Excluirmovimentacao(movimentacaoId: number): Observable<any>{
    const apiUrl = `${this.urlMov}/${movimentacaoId}`;
    return this.http.delete<Movimentacao>(apiUrl, httpOptions);
  }
}
