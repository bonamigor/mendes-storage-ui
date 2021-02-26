import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit, OnDestroy {
  clientes!: Cliente[];
  subscricao!: Subscription;

  displayedColumns: string[] = ['id', 'nome', 'cpf'];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.subscricao = this.clienteService.listaClienteSubject.subscribe(
      (clientes: Cliente[]) => {
        this.clientes = clientes;
      }
    );
    this.clientes = this.clienteService.getClientes();
  }

  ngOnDestroy(): void {
    this.subscricao.unsubscribe();
  }

  

}
