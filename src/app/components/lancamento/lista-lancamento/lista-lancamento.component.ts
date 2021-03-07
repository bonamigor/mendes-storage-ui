import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Lancamento } from 'src/app/models/lancamento.model';
import { LancamentoService } from 'src/app/services/lancamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-lancamento',
  templateUrl: './lista-lancamento.component.html',
  styleUrls: ['./lista-lancamento.component.css']
})
export class ListaLancamentoComponent implements OnInit {

  lancamento!: Lancamento;
  lancamentos: Lancamento[] = [];
  subscricao!: Subscription;

  displayedColumns: string[] = ['id', 'cliente', 'produto', 'valorTotal', 'numeroNota', 'acoes'];

  constructor(private lancamentoService: LancamentoService,
              private activatedRoute: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
    this.getLancamentos();
  }

  getLancamentos(): void {
    this.lancamentoService.getLancamentos().subscribe((data: Lancamento[]) => {
      this.lancamentos = data;
    });
  }

  deleteLancamento(id: number): void {
    Swal.fire({
      title: 'Deseja excluir esse lançamento?',
      text: 'Cuidado! Esse lançamento será excluído.',
      icon: 'warning',
      showConfirmButton: true,
      allowOutsideClick: false,
      allowEnterKey: true,
      allowEscapeKey: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) { // ==> Detectar se a pergunta acima foi recusada
        Swal.fire({
          title: 'Cancelar',
          text: 'Retornando para a Lista de Lançamentos',
          icon: 'error',
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEnterKey: true,
          allowEscapeKey: false,
        });
      } else { // Se a pergunta foi aceita entao...
        this.lancamentoService.deleteLancamento(id).subscribe(res => {
          Swal.fire({
            title: 'Excluído!',
            text: 'O lançamento foi excluído.',
            icon: 'success',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEnterKey: true,
            allowEscapeKey: false,
          });
          this.getLancamentos(); // ==> Renovar a lista.
        });
      }
    });
  }

}
