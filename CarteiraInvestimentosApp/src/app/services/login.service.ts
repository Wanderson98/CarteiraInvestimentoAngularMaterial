import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
const httpOptions = {headers: new HttpHeaders({ 'content-Type': 'application/json'})}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'https://localhost:7213/api/Logins';

  constructor(private http: HttpClient) { }

  ListarTodos(): Observable<Login[]>{
    return this.http.get<Login[]>(this.url);
  }

  ListarPeloId(loginId: number): Observable<Login>{
    const apiUrl = `${this.url}/${loginId}`;
    return this.http.get<Login>(apiUrl);
  }

  SalvarLogin(login: Login): Observable<any>{
    return this.http.post<Login>(this.url, login, httpOptions);
  }

  AtualizarLogin(login: Login): Observable<any>{
    const apiUrl = `${this.url}/${login.loginId}`;
    return this.http.put<Login>(apiUrl, login, httpOptions);
  }

  ExcluirLogin(loginId: number): Observable<any>{
    const apiUrl = `${this.url}/${loginId}`;
    return this.http.delete<Login>(apiUrl, httpOptions); 
  }
}
