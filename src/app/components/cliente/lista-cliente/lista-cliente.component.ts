import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Cliente from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {
  clientes!: Cliente[];
  subscricao!: Subscription;

  displayedColumns: string[] = ['codigo', 'nome', 'cpf'];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe((data: Cliente[]) => {
      this.clientes = data;
    });
  }

}
