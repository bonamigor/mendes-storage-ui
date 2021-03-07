import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Cliente from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = 'https://bonamigo-api.herokuapp.com/clientes';

  listaClienteSubject = new Subject<Cliente[]>();
  cliente!: Cliente[];

  constructor(private httpClient: HttpClient) { }

  getClientes(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  getClienteById(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}/${id}`)
  }

  createNewCliente(cliente: Cliente): Observable<any> {
    return this.httpClient.post(`${this.url}`, cliente);
  }

  updateCliente(cliente: Cliente): Observable<any> {
    return this.httpClient.put(`${this.url}/${cliente.codigo}`, cliente);
  }

  deleteCliente(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

}
