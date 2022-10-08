import { Produto } from './Produto';
export class Cupom {
    ID: string;
    razao_social: string;
    dados_empresa: string;
    total_itens: string;
    cnpj: string;
    valor_total: string;
    chave_nota_fiscal: string;
    quantidade_cupons: string;
    data_emissao: string;
    user: string;
    vouchers?: any;
    dt_cadastro:any
    produtos: Array<Produto>
  }
  