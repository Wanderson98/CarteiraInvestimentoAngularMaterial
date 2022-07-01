import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autenticacao } from '../models/autenticacao';

const httpOptions = {headers: new HttpHeaders({'content-Type': 'application/json'})};
@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  url = 'https://localhost:7213/api/Autenticacoes'

  constructor(private http: HttpClient) { }

  obterTodosUsuarios():Observable<Autenticacao[]>{
    return this.http.get<Autenticacao[]>(this.url);
  }

  salvarLogin(autenticacao: Autenticacao): Observable<any> {
    return this.http.post<Autenticacao>(this.url, autenticacao, httpOptions);
  } 
  
  atualizarStatus(autenticacao: Autenticacao): Observable<any> {
    return this.http.put<Autenticacao>(`${this.url}/${autenticacao.autenticacaoId}`, autenticacao, httpOptions);
  } 

  obterUsuarioEmailSenha(autenticacaoEmail: string, autenticacaoSenha: string): Observable<Autenticacao> {
    const teste={
      login: autenticacaoEmail,
      senha: autenticacaoSenha
    }
    return this.http.post<Autenticacao>(`${this.url}`,teste, httpOptions);

  }

}
