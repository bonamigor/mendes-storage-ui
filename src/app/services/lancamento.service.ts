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

  lancamentos!: Lancamento[];

  url = 'http://localhost:8080/lancamentos';

  listaLancamentoSubject = new Subject<Lancamento[]>();

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getLancamentos(): Observable<Lancamento[]> {
    return this.httpClient.get<Lancamento[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  adicionarCliente(lancamento: Lancamento): void {
    this.lancamentos.push(lancamento);
    this.disparaEventoAtualizacaoListaLancamentos();
  }

  private disparaEventoAtualizacaoListaLancamentos(): void {
    this.listaLancamentoSubject.next(this.lancamentos.slice());
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
