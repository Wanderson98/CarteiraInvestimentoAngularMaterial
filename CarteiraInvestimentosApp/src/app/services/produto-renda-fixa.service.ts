import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoRendaFixa } from '../models/produtoRendaFixa';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoRendaFixaService {

  private url = 'https://localhost:7213/api/ProdutoRendaFixas';
  constructor(private http: HttpClient) { }

  pegarTodos(): Observable<ProdutoRendaFixa[]> {
    return this.http.get<ProdutoRendaFixa[]>(this.url, httpOptions)
  }
  pegarPorId(produtoRendaFixaId: number): Observable<ProdutoRendaFixa> {
    const url = `${this.url}/${produtoRendaFixaId}`;
    return this.http.get<ProdutoRendaFixa>(url, httpOptions)
  }
  salvarProdutoRendaFixa(produtoRendaFixa: ProdutoRendaFixa): Observable<ProdutoRendaFixa> {
    return this.http.post<ProdutoRendaFixa>(this.url, produtoRendaFixa, httpOptions);
  }
  atualizarProdutoRendaFixa(produtoRendaFixa: ProdutoRendaFixa): Observable<any> {
    const url = `${this.url}/${produtoRendaFixa.produtoRendaFixaId}`;
    return this.http.put<ProdutoRendaFixa>(url,produtoRendaFixa,httpOptions);
  }
  excluirProdutoRendaFixa(ProdutoRendaFixa: number): Observable<any> {
    const url = `${this.url}/${ProdutoRendaFixa}`;
    return this.http.delete<number>(url, httpOptions)
  }
}
