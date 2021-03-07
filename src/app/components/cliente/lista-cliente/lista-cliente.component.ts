import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Cliente from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  subscricao!: Subscription;

  displayedColumns: string[] = ['codigo', 'nome', 'cpf', 'acoes'];

  constructor(private clienteService: ClienteService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe((data: Cliente[]) => {
      this.clientes = data;
    });
  }

  deleteCliente(codigo: number): void {
    Swal.fire({
      title: 'Deseja excluir esse cliente?',
      text: 'Cuidado! Esse cliente será excluído.',
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
          text: 'Retornando para a Lista de Clientes',
          icon: 'error',
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEnterKey: true,
          allowEscapeKey: false,
        });
      } else { // Se a pergunta foi aceita entao...
        this.clienteService.deleteCliente(codigo).subscribe(res => {
          Swal.fire({
            title: 'Excluído!',
            text: 'O cliente foi excluído.',
            icon: 'success',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEnterKey: true,
            allowEscapeKey: false,
          });
          this.getClientes(); // ==> Renovar a lista.
        });
      }
    });
  }

}
