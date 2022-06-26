
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poupanca } from '../models/poupanca';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PoupancaService {

  constructor(private http: HttpClient) { }

  private url = 'https://localhost:7213/api/Poupancas';

  pegarTodos(): Observable<Poupanca[]> {
    return this.http.get<Poupanca[]>(this.url, httpOptions)
  }
  pegarPorId(poupancaId: number): Observable<Poupanca> {
    const url = `${this.url}/${poupancaId}`;
    return this.http.get<Poupanca>(url, httpOptions)
  }
  salvarPoupanca(poupanca: Poupanca): Observable<Poupanca> {
    return this.http.post<Poupanca>(this.url, poupanca, httpOptions);
  }
  atualizarPoupanca(poupanca: Poupanca): Observable<any> {
    return this.http.put<Poupanca>(`${this.url}/${poupanca.poupancaId}`,poupanca,httpOptions);
  }
  excluirPoupanca(poupanca:number): Observable<any> {
    const url = `${this.url}/${poupanca}`;
    return this.http.delete<number>(url, httpOptions)
  }
}
