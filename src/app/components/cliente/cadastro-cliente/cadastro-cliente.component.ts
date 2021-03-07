import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Cliente from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  modoEdicao = false;
  formularioCadastro: FormGroup = this.formBuilder.group({
    nome: ['', Validators.required],
    cpf: ['', Validators.required]
  });
  codigo_cliente: number = 0;

  constructor(
    private clienteService: ClienteService, 
    private router: Router, 
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.checkParam();
  }

  checkParam(): void {
    this.activedRoute.params.subscribe(params => {
      if(params.id) {
        this.codigo_cliente = params.id;
        this.modoEdicao = true;
        this.getCliente(this.codigo_cliente);
      }
    })
  }

  getCliente(id: number): void {
    this.clienteService.getClienteById(id).subscribe((res: Cliente) => {
      this.formularioCadastro.setValue({
        nome: res.nome,
        cpf: res.cpf
      });
    });
  }

  createCliente(): void {
    this.clienteService.createNewCliente(this.formularioCadastro.value).subscribe(res => {
      Swal.fire({
        title: 'Cliente cadastrado com sucesso!',
        icon: 'success',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEnterKey: true,
        allowEscapeKey: false,
      }).then((data) => {
        this.router.navigate(['/clientes']);
      });
    });
  }
  
  updateCliente(): void {
    const cliente: Cliente = {
      codigo: this.codigo_cliente,
      ...this.formularioCadastro.value
    };

    this.clienteService.updateCliente(cliente).subscribe(res => {
      Swal.fire({
        title: 'Cliente atualizado com sucesso!',
        icon: 'success',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEnterKey: true,
        allowEscapeKey: false,
      }).then((data) => {
        this.router.navigate(['/clientes']);
      });
    })

  }

  onSubmit(): void { 
    if(!this.codigo_cliente) {
      this.createCliente();
    } else {
      this.updateCliente();
    }
  }

  retornaPaginaDeListar() {
    this.router.navigate(['/clientes']);
  }
}
