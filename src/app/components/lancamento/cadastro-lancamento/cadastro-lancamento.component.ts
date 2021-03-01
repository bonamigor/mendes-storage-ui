import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { LancamentoService } from 'src/app/services/lancamento.service';

@Component({
  selector: 'app-cadastro-lancamento',
  templateUrl: './cadastro-lancamento.component.html',
  styleUrls: ['./cadastro-lancamento.component.css']
})
export class CadastroLancamentoComponent implements OnInit {

  modoEdicao = false;
  idLancamentoAtual!: number;
  formularioCadastro!: FormGroup;

  clienteFormControl = new FormControl;
  dataFormControl = new FormControl;
  produtoFormControl = new FormControl;
  unidadeMedidaFormControl = new FormControl;
  valorUnitarioFormControl = new FormControl;
  quantidadeFormControl = new FormControl;
  valorTotalFormControl = new FormControl;
  numeroNotaFormControl = new FormControl;
  observacaoFormControl = new FormControl;

  constructor(private router: Router, private activedRoute: ActivatedRoute, private lancamentoService: LancamentoService) { }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(
      (params: Params) => {
        this.idLancamentoAtual = +params.id;
        this.modoEdicao = params.id != null;
        this.iniciarFormulario();
    });
  }

  private iniciarFormulario(): void {
    let cliente = '';
    let data: Date | any;
    let produto = '';
    let unidadeMedida = '';
    let valorUnitario: number | any;
    let quantidade: number | any;
    let valorTotal: number | any;
    let numeroNota: number | any;
    let observacao = '';

    if (this.modoEdicao) {
      const lancamento = this.lancamentoService.getLancamentoPorId(this.idLancamentoAtual);
      cliente = lancamento.cliente;
      data = lancamento.dataLancamento;
      produto = lancamento.produto;
      unidadeMedida = lancamento.unidadeMedida;
      valorUnitario = lancamento.valorUnitario;
      quantidade = lancamento.quantidade;
      valorTotal = lancamento.valorTotal;
      numeroNota = lancamento.numeroNota;
      observacao = lancamento.observacao;
    }

    this.clienteFormControl = new FormControl(cliente, [Validators.required]);
    this.dataFormControl = new FormControl(data, [Validators.required]);
    this.produtoFormControl = new FormControl(produto, [Validators.required]);
    this.unidadeMedidaFormControl = new FormControl(unidadeMedida, [Validators.required]);
    this.valorUnitarioFormControl = new FormControl(valorUnitario, [Validators.required]);
    this.quantidadeFormControl = new FormControl(quantidade, [Validators.required]);
    this.valorTotalFormControl = new FormControl(valorTotal, [Validators.required]);
    this.numeroNotaFormControl = new FormControl(numeroNota, [Validators.required]);
    this.observacaoFormControl = new FormControl(observacao, [Validators.required]);

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
