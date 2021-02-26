import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  listaClienteSubject = new Subject<Cliente[]>();

  private clientes: Cliente[] = [
    new Cliente(1, 'Rafael Bonamigo', '701.026.311-66'),
    new Cliente(2, 'Juarez Bonamigo', '471.222.850-59'),
  ];

  constructor() { }

  getClientes(): Cliente[] {
    return this.clientes.slice();
  }

  adicionarCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
    this.disparaEventoAtualizacaoListaClientes();
  }

  private disparaEventoAtualizacaoListaClientes(): void {
    this.listaClienteSubject.next(this.clientes.slice());
  }

}
