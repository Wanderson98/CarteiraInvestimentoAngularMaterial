import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {headers: new HttpHeaders(

  {'X-RapidAPI-Key': '1d61b45acfmsh2f0afe2e2c2a8d9p1facf8jsn5865547517f8',
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
