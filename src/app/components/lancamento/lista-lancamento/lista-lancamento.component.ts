import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Lancamento } from 'src/app/models/lancamento.model';
import { LancamentoService } from 'src/app/services/lancamento.service';

@Component({
  selector: 'app-lista-lancamento',
  templateUrl: './lista-lancamento.component.html',
  styleUrls: ['./lista-lancamento.component.css']
})
export class ListaLancamentoComponent implements OnInit, OnDestroy {

  lancamento!: Lancamento;
  lancamentos!: Lancamento[];
  subscricao!: Subscription;

  displayedColumns: string[] = ['id', 'cliente', 'dataLancamento',
   'produto', 'unidadeMedida', 'valorUnitario', 'quantidade', 
   'valorTotal', 'numeroNota', 'observacao'];

  constructor(private lancamentoService: LancamentoService,
              private activatedRoute: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
    this.subscricao = this.lancamentoService.listaLancamentoSubject.subscribe(
      (lancamentos: Lancamento[]) => {
        this.lancamentos = lancamentos;
      }
    );
    this.lancamentos = this.lancamentoService.getLancamentosOff();
  }

  ngOnDestroy(): void {
    this.subscricao.unsubscribe();
  }

  getLancamentos() {
    this.lancamentoService.getLancamentos().subscribe((lancamentos: Lancamento[]) => {
      this.lancamentos = lancamentos;
    });
  }

  getLancamentosOff() {
    this.lancamentoService.getLancamentosOff();
  }

  onSelecionarLancamento(lancamento: Lancamento): void {
    this.router.navigate([lancamento.id, 'edicao'], {relativeTo: this.activatedRoute});
    console.log(lancamento);
  }

}
