export interface IEmailService {
    sendEmailClientAsync(_from: string, _to: any, _subject: string, _html: string): Promise<any>
    sendEmailVencedor(_to: any, code_nota, nome_nota, cpf_nota, valor_nota, voucher): Promise<any>
    sendEmailNumerosSorteio(_to: any, numeros: any): Promise<any> 
    sendEmailLojaSorteio(_to: any, code_nota, nome_nota, cpf_nota, valor_nota, voucher): Promise<any>
    sendEmailErro(_to: any, message: any): Promise<any>
}