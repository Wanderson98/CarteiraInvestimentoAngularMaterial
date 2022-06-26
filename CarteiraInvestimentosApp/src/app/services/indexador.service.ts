import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IndexadorRendimentos } from '../models/indexadorRendimentos';


const httpOptions = {headers: new HttpHeaders({ 'content-Type': 'application/json'})}

@Injectable({
  providedIn: 'root'
})
export class IndexadorService {

  url = 'https://localhost:7213/api/IndexadorRendimentos';

  constructor(private http: HttpClient) { }

  ListarTodos(): Observable<IndexadorRendimentos[]>{
    return this.http.get<IndexadorRendimentos[]>(this.url);
  }

  ListarPeloId(indexadorRendimentosId: number): Observable<IndexadorRendimentos>{
    const apiUrl = `${this.url}/${indexadorRendimentosId}`;
    return this.http.get<IndexadorRendimentos>(apiUrl);
  }

  SalvarIndexadorRendimentos(indexadorRendimentos: IndexadorRendimentos): Observable<any>{
    return this.http.post<IndexadorRendimentos>(this.url, indexadorRendimentos, httpOptions);
  }

  AtualizarIndexadorRendimentos(indexadorRendimentos: IndexadorRendimentos): Observable<any>{
    const apiUrl = `${this.url}/${indexadorRendimentos.indexadorRendimentosId}`;
    return this.http.put<IndexadorRendimentos>(apiUrl, indexadorRendimentos, httpOptions);
  }

  ExcluirIndexadorRendimentos(indexadorRendimentosId: number): Observable<any>{
    const apiUrl = `${this.url}/${indexadorRendimentosId}`;
    return this.http.delete<IndexadorRendimentos>(apiUrl, httpOptions); 
  }
}
