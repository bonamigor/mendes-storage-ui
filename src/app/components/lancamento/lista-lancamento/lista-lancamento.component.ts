import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Lancamento } from 'src/app/models/lancamento.model';
import { LancamentoService } from 'src/app/services/lancamento.service';

@Component({
  selector: 'app-lista-lancamento',
  templateUrl: './lista-lancamento.component.html',
  styleUrls: ['./lista-lancamento.component.css']
})
export class ListaLancamentoComponent implements OnInit, OnDestroy {

  lancamentos!: Lancamento[];
  subscricao!: Subscription;

  displayedColumns: string[] = ['id', 'cliente', 'dataLancamento',
   'produto', 'unidadeMedida', 'valorUnitario', 'quantidade', 
   'valorTotal', 'numeroNota', 'observacao'];

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit(): void {
    this.subscricao = this.lancamentoService.listaLancamentoSubject.subscribe(
      (lancamentos: Lancamento[]) => {
        this.lancamentos = lancamentos;
      }
    );
    this.lancamentos = this.lancamentoService.getLancamentos();
  }

  ngOnDestroy(): void {
    this.subscricao.unsubscribe();
  }

}
