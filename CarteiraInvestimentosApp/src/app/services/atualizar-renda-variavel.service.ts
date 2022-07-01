import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {headers: new HttpHeaders(

  {'X-RapidAPI-Key': 'bfc580e7b6mshfbce251b4543b5fp13884bjsn38a6aa9e2806',
    'X-RapidAPI-Host': 'google-finance4.p.rapidapi.com'
  },
  
  )
}

@Injectable({
  providedIn: 'root'
})
export class AtualizarRendaVariavelService {


 private  url = 'https://google-finance4.p.rapidapi.com/search/?q';

  constructor(private http: HttpClient) { }

  PegarValorAtual(nome:string): Observable<any>{
    const apiUrl = `${this.url}=${nome}`;
    return this.http.get<any>(apiUrl, httpOptions);
  }

}
