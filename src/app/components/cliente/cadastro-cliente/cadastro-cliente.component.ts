import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {
  formularioCadastro!: FormGroup;

  nomeFormControl = new FormControl('',[
    Validators.required,
  ]);

  cpfFormControl = new FormControl('',[
    Validators.required,
  ]);

  constructor(private clienteService: ClienteService, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.formularioCadastro = new FormGroup({
      nome: this.nomeFormControl,
      cpf: this.cpfFormControl
    });
  }

  onSubmit(): void { 
    const nome = this.formularioCadastro.value.nome;
    const cpf = this.formularioCadastro.value.cpf;

    const cliente = new Cliente(this.getRandomId(), nome, cpf);

    this.clienteService.adicionarCliente(cliente);

    console.log(cliente);
    
    this.formularioCadastro.reset();
    this.retornaPaginaDeListar();
  }

  getRandomId(): number {
    return Math.floor(Math.random() * 100);
  }

  retornaPaginaDeListar() {
    this.router.navigate(['/clientes']);
  }
}
