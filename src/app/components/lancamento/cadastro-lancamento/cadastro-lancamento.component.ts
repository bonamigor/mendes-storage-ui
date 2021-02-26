import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-cadastro-lancamento',
  templateUrl: './cadastro-lancamento.component.html',
  styleUrls: ['./cadastro-lancamento.component.css']
})
export class CadastroLancamentoComponent implements OnInit {
  formularioCadastro!: FormGroup;

  clienteFormControl = new FormControl('',[
    Validators.required,
  ]);

  dataFormControl = new FormControl('',[
    Validators.required,
  ]);

  produtoFormControl = new FormControl('',[
    Validators.required,
  ]);

  unidadeMedidaFormControl = new FormControl('',[
    Validators.required,
  ]);

  valorUnitarioFormControl = new FormControl('',[
    Validators.required,
  ]);

  quantidadeFormControl = new FormControl('',[
    Validators.required,
  ]);

  valorTotalFormControl = new FormControl('',[
    Validators.required,
  ]);

  numeroNotaFormControl = new FormControl('',[
    Validators.required,
  ]);

  observacaoFormControl = new FormControl('',[
    Validators.required,
  ]);

  constructor(private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.formularioCadastro = new FormGroup({
      cliente: this.clienteFormControl,
      data: this.dataFormControl,
      produto: this.produtoFormControl,
      unidadeMedida: this.unidadeMedidaFormControl,
      valorUnitario: this.valorUnitarioFormControl,
      quantidade: this.quantidadeFormControl,
      valorTotal: this.valorTotalFormControl,
      numeroNota: this.numeroNotaFormControl,
      observacao: this.observacaoFormControl
    });
  }

  onSubmit(): void {
    const cliente = this.formularioCadastro.value.cliente;
    const data = this.formularioCadastro.value.data;
    const produto = this.formularioCadastro.value.produto;
    const unidadeMedida = this.formularioCadastro.value.unidadeMedida;
    const valorUnitario = this.formularioCadastro.value.valorUnitario;
    const quantidade = this.formularioCadastro.value.quantidade;
    const valorTotal = this.formularioCadastro.value.valorTotal;
    const numeroNota = this.formularioCadastro.value.numeroNota;
    const observacao = this.formularioCadastro.value.observacao;
    
    this.formularioCadastro.reset();
    this.retornaPaginaDeListar();
  }

  retornaPaginaDeListar() {
    this.router.navigate(['/lancamentos']);
  }

}
