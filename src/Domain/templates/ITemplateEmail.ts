export interface ITemplateEmail {
    generateTemplateEmailVencedor(code_nota, nome_nota, cpf_nota, valor_nota, voucher)
    generateTemplateNumerosSorteio(numeros) 
    generateTemplateLojaSorteadaSorteio(code_nota, nome_nota, cpf_nota, valor_nota, voucher)
    generateTemplateError(message)
}