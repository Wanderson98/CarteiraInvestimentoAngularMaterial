import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carteira } from '../models/carteira';


const httpOptions = {headers: new HttpHeaders({ 'content-Type': 'application/json'})}

@Injectable({
  providedIn: 'root'
})
export class CarteiraService {

  url = 'https://localhost:7213/api/Carteiras';

  constructor(private http: HttpClient) { }

   ListarTodos(): Observable<Carteira[]>{
    return this.http.get<Carteira[]>(this.url);
   }

   ListarPeloId(carteiraId: number): Observable<Carteira>{
    const apiUrl = `${this.url}/${carteiraId}`;
    return this.http.get<Carteira>(apiUrl);
   }

   SalvarCarteira(Carteira: Carteira): Observable<any>{
    return this.http.post<Carteira>(this.url, Carteira, httpOptions);
   }

   AtualizarCarteira(carteira: Carteira): Observable<any>{
    const apiUrl = `${this.url}/${carteira.carteiraId}`;
    return this.http.put<Carteira>(apiUrl, carteira, httpOptions);
   }

   ExcluirCarteira(carteiraId: number): Observable<any>{
    const apiUrl = `${this.url}/${carteiraId}`;
    return this.http.delete<Carteira>(apiUrl, httpOptions); 
   }
}
