import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Lancamento } from 'src/app/models/lancamento.model';
import { LancamentoService } from 'src/app/services/lancamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-lancamento',
  templateUrl: './cadastro-lancamento.component.html',
  styleUrls: ['./cadastro-lancamento.component.css']
})
export class CadastroLancamentoComponent implements OnInit {

  modoEdicao = false;
  formularioCadastro: FormGroup = this.formBuilder.group({
    cliente: ['', Validators.required],
    dataLancamento: ['', Validators.required],
    produto: ['', Validators.required],
    unidadeMedida: ['', Validators.required],
    valorUnitario: ['', Validators.required],
    quantidade: ['', Validators.required],
    valorTotal: ['', Validators.required],
    numeroNota: ['', Validators.required],
    observacao: ['', Validators.required],
  });
  id_lancamento: number = 0;

  constructor(
    private router: Router, 
    private activedRoute: ActivatedRoute, 
    private lancamentoService: LancamentoService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.checkParam();
  }

  checkParam(): void {
    this.activedRoute.params.subscribe(params => {
      if(params.id) {
        this.id_lancamento = params.id;
        this.modoEdicao = true;
        this.getLancamento(this.id_lancamento);
      }
    })
  }

  getLancamento(id: number): void {
    this.lancamentoService.getLancamentoById(id).subscribe((res: Lancamento) => {
      this.formularioCadastro.setValue({
        cliente: res.cliente,
        dataLancamento: res.dataLancamento,
        produto: res.produto,
        unidadeMedida: res.unidadeMedida,
        valorUnitario: res.valorUnitario,
        quantidade: res.quantidade,
        valorTotal: res.valorTotal,
        numeroNota: res.numeroNota,
        observacao: res.observacao
      });
    });
  }

  createLancamento(): void {
    this.lancamentoService.createNewLancamento(this.formularioCadastro.value).subscribe(res => {
      Swal.fire({
        title: 'Lançamento cadastrado com sucesso!',
        icon: 'success',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEnterKey: true,
        allowEscapeKey: false,
      }).then((data) => {
        this.router.navigate(['/lancamentos']);
      });
    });
  }
  
  updateLancamento(): void {
    const lancamento: Lancamento = {
      id: this.id_lancamento,
      ...this.formularioCadastro.value
    };

    this.lancamentoService.updateLancamento(lancamento).subscribe(res => {
      Swal.fire({
        title: 'Lançamento atualizado com sucesso!',
        icon: 'success',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEnterKey: true,
        allowEscapeKey: false,
      }).then((data) => {
        this.router.navigate(['/lancamentos']);
      });
    })

  }

  onSubmit(): void { 
    if(!this.id_lancamento) {
      this.createLancamento();
    } else {
      this.updateLancamento();
    }
  }

}
