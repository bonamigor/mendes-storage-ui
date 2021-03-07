import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Lancamento } from '../models/lancamento.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  url = 'https://bonamigo-api.herokuapp.com/lancamentos';

  constructor(private httpClient: HttpClient) { }

  getLancamentos(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  getLancamentoById(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}/${id}`)
  }

  createNewLancamento(lancamento: Lancamento): Observable<any> {
    return this.httpClient.post(`${this.url}`, lancamento);
  }

  updateLancamento(lancamento: Lancamento): Observable<any> {
    return this.httpClient.put(`${this.url}/${lancamento.id}`, lancamento);
  }

  deleteLancamento(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

}
