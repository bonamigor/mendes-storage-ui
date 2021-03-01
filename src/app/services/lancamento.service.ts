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
  private lancamentosOff: Lancamento[] = [
    new Lancamento(1, 'JUAREZ', new Date(), 'Macarrão',
    'KG', 2.99, 1000, 2990, 456987, 'Novas'),
    new Lancamento(2, 'JUAREZ', new Date(), 'Molho de Tomate',
    'KG', 3.69, 1000, 3690, 123578, 'Novas')];

  url = 'http://localhost:8080/lancamentos';

  listaLancamentoSubject = new Subject<Lancamento[]>();

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getLancamentosOff(): Lancamento[]{
    return this.lancamentosOff.slice();
  }

  getLancamentoPorId(id: number): Lancamento {
    let lancamento:Lancamento | any= this.lancamentosOff.find(
      (lancamentoAtual: Lancamento) => {
        return lancamentoAtual.id === id;
      }
    );
    return lancamento;
  }

  getLancamentos(): Observable<Lancamento[]> {
    return this.httpClient.get<Lancamento[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getLancamentoById(id: number): Observable<Lancamento> {
    return this.httpClient.get<Lancamento>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  salvarLancamento(lancamento: Lancamento): Observable<Lancamento> {
    return this.httpClient.post<Lancamento>(this.url, JSON.stringify(lancamento), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  atualizarLancamento(lancamento: Lancamento): Observable<Lancamento> {
    return this.httpClient.put<Lancamento>(this.url + '/' + lancamento.id, JSON.stringify(lancamento), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  excluirLancamento(lancamento: Lancamento) {
    return this.httpClient.delete<Lancamento>(this.url + '/' + lancamento.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
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
