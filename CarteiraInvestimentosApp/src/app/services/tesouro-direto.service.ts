import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TesouroDireto } from '../models/tesouroDireto';


const httpOptions ={
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class TesouroDiretoService {

  constructor(private http: HttpClient) { }
  private urlApi = 'https://localhost:7213/api/TesouroDiretos';

  pegarTodos(): Observable<TesouroDireto[]> {
    return this.http.get<TesouroDireto[]>(this.urlApi, httpOptions)
  }
  pegarPorId(tesouroId: number): Observable<TesouroDireto> {
    const url = `${this.urlApi}/${tesouroId}`;
    return this.http.get<TesouroDireto>(url, httpOptions)
  }
  pegarPorIndexador(indexId: number): Observable<TesouroDireto> {
    const url = `${this.urlApi}/indexador/${indexId}`;
    return this.http.get<TesouroDireto>(url, httpOptions)
  }
  salvarTesouro(tesouro: TesouroDireto): Observable<TesouroDireto> {
    return this.http.post<TesouroDireto>(this.urlApi, tesouro, httpOptions);
  }
  atualizarTesouro(tesouro: TesouroDireto): Observable<any> {
    return this.http.put<TesouroDireto>(`${this.urlApi}/${tesouro.tesouroDiretoId}`,tesouro,httpOptions);
  }
  excluirTesouro(tesouro:number): Observable<any> {
    const url = `${this.urlApi}/${tesouro}`;
    return this.http.delete<number>(url, httpOptions)
  }
}
