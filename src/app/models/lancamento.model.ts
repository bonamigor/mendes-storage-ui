export class Lancamento {
    id: number;
    cliente: string;
    dataLancamento: Date;
    produto: string;
    unidadeMedida: string;
    valorUnitario: number;
    quantidade: number;
    valorTotal: number;
    numeroNota: number;
    observacao: string;

    constructor(id: number, cliente: string, dataLancamento: Date, 
        produto: string, unidadeMedida: string, valorUnitario: number, 
        quantidade: number, valorTotal: number, numeroNota: number, observacao: string) {
            this.id = id;
            this.cliente = cliente;
            this.dataLancamento = new Date();
            this.produto = produto;
            this.unidadeMedida = unidadeMedida;
            this.valorUnitario = valorUnitario;
            this.quantidade = quantidade;
            this.valorTotal = valorTotal;
            this.numeroNota = numeroNota;
            this.observacao = observacao;
    }

    
}