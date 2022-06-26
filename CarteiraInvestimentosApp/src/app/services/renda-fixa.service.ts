
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RendaFixa } from '../models/rendaFixa';
const httpOptions ={
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RendaFixaService {

  constructor(private http: HttpClient) { }
  private urlApi = 'https://localhost:7213/api/RendaFixas';

  pegarTodos(): Observable<RendaFixa[]> {
    return this.http.get<RendaFixa[]>(this.urlApi, httpOptions)
  }
  pegarPorId(rendaFixaId: number): Observable<RendaFixa> {
    const url = `${this.urlApi}/${rendaFixaId}`;
    return this.http.get<RendaFixa>(url, httpOptions)
  }
  pegarPorProduto(produtoId: number): Observable<RendaFixa> {
    const url = `${this.urlApi}/produto/${produtoId}`;
    return this.http.get<RendaFixa>(url, httpOptions)
  }
  salvarRendaFixa(rendaFixa: RendaFixa): Observable<RendaFixa> {
    return this.http.post<RendaFixa>(this.urlApi, rendaFixa, httpOptions);
  }
  atualizarRendaFixa(rendaFixa: RendaFixa): Observable<any> {
    return this.http.put<RendaFixa>(`${this.urlApi}/${rendaFixa.rendaFixaId}`,rendaFixa,httpOptions);
  }
  excluirRendaFixa(rendaFixa:number): Observable<any> {
    const url = `${this.urlApi}/${rendaFixa}`;
    return this.http.delete<number>(url, httpOptions)
  }
}
