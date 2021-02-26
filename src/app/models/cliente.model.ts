export class Cliente {
    id: number;
    nome: String;
    cpf: String;

    constructor(id: number, nome: String, cpf: String) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
    }
}