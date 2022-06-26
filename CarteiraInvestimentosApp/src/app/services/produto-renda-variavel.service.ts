import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoRendaVariavel } from '../models/produtoRendaVariavel';


const httpOptions ={
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoRendaVariavelService {

  private url = 'https://localhost:7213/api/ProdutoRendaVariavels';
  constructor(private http: HttpClient) { }

  pegarTodos(): Observable<ProdutoRendaVariavel[]> {
    return this.http.get<ProdutoRendaVariavel[]>(this.url, httpOptions)
  }
  pegarPorId(produtoRendaVariavelId: number): Observable<ProdutoRendaVariavel> {
    const url = `${this.url}/${produtoRendaVariavelId}`;
    return this.http.get<ProdutoRendaVariavel>(url, httpOptions)
  }
  salvarProdutoRendaVariavel(produtoRendaVariavel: ProdutoRendaVariavel): Observable<ProdutoRendaVariavel> {
    return this.http.post<ProdutoRendaVariavel>(this.url, produtoRendaVariavel, httpOptions);
  }
  atualizarProdutoRendaVariavel(produtoRendaVariavel: ProdutoRendaVariavel): Observable<any> {
    const url = `${this.url}/${produtoRendaVariavel.produtoRendaVariavelId}`;
    return this.http.put<ProdutoRendaVariavel>(url,produtoRendaVariavel,httpOptions);
  }
  excluirProdutoRendaVariavel(ProdutoRendaVariavel:number): Observable<any> {
    const url = `${this.url}/${ProdutoRendaVariavel}`;
    return this.http.delete<number>(url, httpOptions)
  }
}
