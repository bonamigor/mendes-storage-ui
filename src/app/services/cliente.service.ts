import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Cliente from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  uri = 'https://bonamigo-api.herokuapp.com';
  url = 'https://bonamigo-api.herokuapp.com/clientes';

  listaClienteSubject = new Subject<Cliente[]>();

  constructor(private httpClient: HttpClient) { }

  getClientes(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  createNewCliente(nome: string, cpf: string) {
    const objCliente = {
      nome,
      cpf
    };
    return this.httpClient.post(`${this.uri}/clientes`, objCliente).subscribe(res => console.log('Feito'));
  }

}
