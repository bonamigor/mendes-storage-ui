import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Lancamento } from '../models/lancamento.model';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentos!: Lancamento[];

  listaLancamentoSubject = new Subject<Lancamento[]>();

  constructor() { }

  getLancamentos(): Lancamento[] {
    return this.lancamentos.slice();
  }

  adicionarCliente(lancamento: Lancamento): void {
    this.lancamentos.push(lancamento);
    this.disparaEventoAtualizacaoListaLancamentos();
  }

  private disparaEventoAtualizacaoListaLancamentos(): void {
    this.listaLancamentoSubject.next(this.lancamentos.slice());
  }
}
