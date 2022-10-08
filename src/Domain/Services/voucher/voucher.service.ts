import { Injectable, Inject } from '@nestjs/common';
import * as _ from "lodash";
import { IMysqlGateway } from 'src/Domain/Interfaces/Gateway/i-mysql-gateway.interface';
import { IVoucherService } from 'src/Domain/Interfaces/Services/i-voucher-service.interface';
import { ReqResponse } from 'src/Domain/Models/ReqResponse';
import { Voucher } from '../../Models/Voucher';
import { IEmailService } from 'src/Domain/Interfaces/Services/i-email-service.interface';




@Injectable()
export class VoucherService implements IVoucherService {

    constructor(
       @Inject('IMysqlGateway') private readonly mysqlGateway: IMysqlGateway,
       @Inject('IEmailService') private readonly emailService: IEmailService) { }

    public async gerarVoucherValido(length: number): Promise<any> {
        let codigo = '';
        const characters = '0123456789';
        const charactersLength = length;
        for (let i = 0; i < length; i++) {
          codigo += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        
        const existeVoucher = await this.getVoucherByCodigo(codigo);

        if(existeVoucher.value.length > 0){
            await this.gerarVoucherValido(6);
        }

        return codigo;
    }
   
        public async getVoucherWithUser(codigo: any): Promise<any> {
            let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`
            SELECT
                u.nome,
                u.cpf,
                u.bairro,
                u.telefone,
                u.instagram,
                u.email,
                c.razao_social,
                c.dados_empresa,
                c.total_itens,
                c.valor_total,
                c.chave_nota_fiscal,
                c.quantidade_cupons,
                c.data_emissao,
                v.codigo,
                v.cupom,
                v.sorteado,
                v.retirou_premio,
                v.dt_cadastro
            FROM user AS u
            JOIN cupom AS c ON c.user = u.email
            JOIN voucher AS v ON v.cupom = c.id
            WHERE v.codigo = '${codigo}'`)

            if (result.code == "error") {
                return new ReqResponse("error","erro inesperado")
            }
            return result;
        }
    
        public async addVoucher(voucher: Omit<Voucher, 'ID'>){
            try {
                let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`INSERT INTO sorteio.voucher (codigo, cupom, user, sorteado, retirou_premio, dt_cadastro) VALUES ('${voucher.codigo}', '${voucher.cupom}', '${voucher.user}', ${voucher.sorteado}, ${voucher.retirou_premio}, '${voucher.dt_cadastro}')`)
                if (result.code == "error") {
                    if(result.value.code == "ER_DUP_ENTRY")
                        return new ReqResponse("error","usuario já existe")
                }else{
                    result.value = "voucher cadastrado com sucesso!"
                }
                return result;
            } catch (e) {
                return e
            }
        }

        public async aprovarRetiradaDePremio(codigo: string, aprovacao_pendente: boolean): Promise<any> {
            try {
                const script = ` UPDATE IGNORE sorteio.voucher SET  aprovacao_pendente = ${aprovacao_pendente} where codigo = '${codigo}' AND id > 0`;
                const result: ReqResponse = await this.mysqlGateway.getQueryAsync(script);

                const voucher: ReqResponse = await this.mysqlGateway.getQueryAsync(`SELECT * FROM sorteio.voucher WHERE codigo = ${codigo}`);
                const cupom: ReqResponse = await this.mysqlGateway.getQueryAsync(` SELECT * FROM sorteio.cupom WHERE ID = '${voucher.value[0].cupom}'` );
                const loja: ReqResponse = await this.mysqlGateway.getQueryAsync(` SELECT * FROM sorteio.loja WHERE CNPJ = '${cupom.value[0].cnpj}'`);
                if (result.code == "error") {
                    return new ReqResponse("error","erro inesperado");
                }else{
                    result.value = "voucher aprovado com sucesso!";
                    const subjectEmail = `Voucher ${codigo} foi aprovado com sucesso`;
                    const conteudoEmail = `O Voucher ${codigo} foi aprovado com sucesso.`;
                    console.log(loja.value[0].EMAIL_PARA_XML_NFE)
                    await this.emailService.sendEmailClientAsync("no-reply@redemultimarket.com.br", loja.value[0].EMAIL_PARA_XML_NFE, subjectEmail, conteudoEmail);
                }
                return result;
            } catch (error) {
                return error
            }
        }
    
        public async updateVoucher(voucher: Voucher, codigo:any, cartaCompromisso?:string, reciboEntregaPremio?: string){
            try {
                const script = cartaCompromisso && reciboEntregaPremio ? 
                `
                UPDATE IGNORE sorteio.voucher 
                SET codigo = '${voucher.codigo}', cupom = '${voucher.cupom}', user = '${voucher.user}', sorteado = ${voucher.sorteado}, retirou_premio = ${voucher.retirou_premio}, dt_cadastro = '${voucher.dt_cadastro}', carta_compromisso = '${cartaCompromisso}',  recibo_entrega_premio = '${reciboEntregaPremio}', aprovacao_pendente = true
                where codigo = '${codigo}' AND id > 0` :
                `
                UPDATE IGNORE sorteio.voucher 
                SET codigo = '${voucher.codigo}', cupom = '${voucher.cupom}', user = '${voucher.user}', sorteado = ${voucher.sorteado}, retirou_premio = ${voucher.retirou_premio}, dt_cadastro = '${voucher.dt_cadastro}'
                where codigo = '${codigo}' AND id > 0`;

                const result: ReqResponse = await this.mysqlGateway.getQueryAsync(script);

                if (result.code == "error") {
                    return new ReqResponse("error","erro inesperado");
                }else{
                    if(cartaCompromisso && reciboEntregaPremio) {
                        const subjectEmail = `Voucher ${codigo} pendente de aprovação`;
                        const conteudoEmail = `A carta de compromisso e o recibo de prêmio do voucher ${codigo} foram enviados e aguardam a sua aprovação.`;
                        await this.emailService.sendEmailClientAsync("no-reply@redemultimarket.com.br", "flavia@agenciaecom.com.br", subjectEmail, conteudoEmail);
                    }
                    result.value = "voucher atualizado com sucesso!";
                }
                return result;
            } catch (e) {
                return e
            }
        }
        
        
        public async getVoucherByID(id: any){
            let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`SELECT * FROM sorteio.voucher where id = ${id}`)
            if (result.code == "error") {
                return new ReqResponse("error","erro inesperado")
            }
            return result;
        }


        public async getVoucherByCodigo(codigo: any){
            let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`SELECT * FROM sorteio.voucher where codigo = '${codigo}'`)
            if (result.code == "error") {
                return new ReqResponse("error","erro inesperado")
            }
            return result;
        }
    
        public async delVoucher(id: any){
            try {
                let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`DELETE FROM sorteio.voucher where id = ${id}`)
                if (result.code == "error") {
                    return new ReqResponse("error","erro inesperado")
                }else{
                    result.value = "voucher deletado com sucesso!"
                }
                return result;
            } catch (error) {
                return error;
            }
        }
    
        public async getVouchers(aprovacaoPendente?: boolean){
            try {
                const script = aprovacaoPendente ? 
                `SELECT v.*,  cp.chave_nota_fiscal, cp.valor_total, lj.RAZAO_SOCIAL, lj.CNPJ, lj.TELEFONE, lj.ASSOC, lj.EMAIL_PARA_XML_NFE 
                FROM sorteio.loja as lj 
                join sorteio.cupom as cp on cp.cnpj = lj.CNPJ 
                join sorteio.voucher as v on v.cupom = cp.ID 
                where v.aprovacao_pendente = ${aprovacaoPendente} and v.sorteado = true` : 
                `SELECT * FROM sorteio.voucher`;
                
                const result: ReqResponse = await this.mysqlGateway.getQueryAsync(script);
                if (result.code == "error") {
                    return new ReqResponse("error","erro inesperado")
                }
                return result;
            } catch (error) {
                return error;
            }
        }

        public async getVouchersNaoSorteados(data_inicial, data_final, num_loteria){
            try {
                let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`CALL sorteio.SP_Sorteia('${num_loteria}','${data_inicial}','${data_final}');`)
                if (result.code == "error") {
                    return new ReqResponse("error","erro inesperado")
                }
                return result;
            } catch (error) {
                return error;
            }
        }

        public async getVoucherByChaveAcesso(chave: any){
            try {
                let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`SELECT * FROM sorteio.voucher where cupom = '${chave}'`)
                if (result.code == "error") {
                    return new ReqResponse("error","erro inesperado")
                }
                return result;
            } catch (error) {
                return error;
            }
        }

}
