
export interface GerarCupomMessage{
	pattern: string,
	user: string,
	cpf: string,
	notaFiscal: {
		razao_social: string,
		dados_empresa: string[],
		cnpj: string,
		total_itens: number,
		valor_total: number,
		chave_nota_fiscal: string,
		quantidade_cupons: number,
		data_emissao: string,
		produtos: {
			nm_produto: string,
			cod_produtos: string,
			qnt_produtos: string,
			unidade_medida_produtos: string,
			vl_produtos: string
		}[],
	}
}