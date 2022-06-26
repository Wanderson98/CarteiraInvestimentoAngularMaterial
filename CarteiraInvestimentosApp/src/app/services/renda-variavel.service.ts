import { RendaVariavel } from './../models/rendaVariavel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



const httpOptions ={
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class RendaVariavelService {

  constructor(private http: HttpClient) { }
  private urlApi = 'https://localhost:7213/api/RendaVariavels';

  pegarTodos(): Observable<RendaVariavel[]> {
    return this.http.get<RendaVariavel[]>(this.urlApi, httpOptions)
  }
  pegarPorId(rendaVariavelId: number): Observable<RendaVariavel> {
    const url = `${this.urlApi}/${rendaVariavelId}`;
    return this.http.get<RendaVariavel>(url, httpOptions)
  }
  pegarPorProduto(produtoId: number): Observable<RendaVariavel> {
    const url = `${this.urlApi}/produto/${produtoId}`;
    return this.http.get<RendaVariavel>(url, httpOptions)
  }
  salvarRendaVariavel(rendaVariavel: RendaVariavel): Observable<RendaVariavel> {
    return this.http.post<RendaVariavel>(this.urlApi, rendaVariavel, httpOptions);
  }
  atualizarRendaVariavel(rendaVariavel: RendaVariavel): Observable<any> {
    return this.http.put<RendaVariavel>(`${this.urlApi}/${rendaVariavel.rendaVariavelId}`,rendaVariavel,httpOptions);
  }
  excluirRendaVariavel(rendaVariavel:number): Observable<any> {
    const url = `${this.urlApi}/${rendaVariavel}`;
    return this.http.delete<number>(url, httpOptions)
  }
}
