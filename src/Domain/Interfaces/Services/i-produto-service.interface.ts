import { Produto } from '../../Models/Produto';

export interface IProdutoService {
    getProdutos()
    getProdutoByID(id: any)
    addProdutos(produtos: Array<Produto>)
}