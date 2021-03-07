import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroClienteComponent } from './components/cliente/cadastro-cliente/cadastro-cliente.component';
import { ListaClienteComponent } from './components/cliente/lista-cliente/lista-cliente.component';
import { CadastroLancamentoComponent } from './components/lancamento/cadastro-lancamento/cadastro-lancamento.component';
import { ListaLancamentoComponent } from './components/lancamento/lista-lancamento/lista-lancamento.component';

const routes: Routes = [
  {path: 'clientes', component: ListaClienteComponent},
  {path: 'lancamentos', component: ListaLancamentoComponent},
  {path: 'cadastro-cliente', component: CadastroClienteComponent},
  {path: 'cadastro-lancamento', component: CadastroLancamentoComponent},
  {path: 'lancamento/:id', component: CadastroLancamentoComponent},
  {path: 'cliente/:id', component: CadastroClienteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
