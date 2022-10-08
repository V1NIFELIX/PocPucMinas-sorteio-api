import { Injectable, Inject } from '@nestjs/common';

import * as path from "path"
import * as fs from "fs"
import * as _ from "lodash";
import { IMysqlGateway } from 'src/Domain/Interfaces/Gateway/i-mysql-gateway.interface';
import { ReqResponse } from '../../Models/ReqResponse';
import { ILojaService } from 'src/Domain/Interfaces/Services/i-loja-service.interface';
import { Loja } from 'src/Domain/Models/Loja';



@Injectable()
export class LojaService implements ILojaService {

    constructor(@Inject('IMysqlGateway') private readonly mysqlGateway: IMysqlGateway) { }


    public async addLoja(loja: Loja){
        try {
            let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`INSERT INTO sorteio.loja (NUMERO_LOJA, RAZAO_SOCIAL, ENDERECO,BAIRRO, CIDADE, CEP, CNPJ,IE, TELEFONE, EMAIL_PARA_XML_NFE) VALUES ('${loja.NUMERO_LOJA}', '${loja.RAZAO_SOCIAL}', '${loja.ENDERECO}', '${loja.BAIRRO}', '${loja.CIDADE}', '${loja.CEP}', '${loja.CNPJ}', '${loja.IE}','${loja.TELEFONE}', '${loja.EMAIL_PARA_XML_NFE}')`)
            if (result.code == "error") {
                if(result.value.code == "ER_DUP_ENTRY")
                    return new ReqResponse("error","loja já existe")
            }else{
                result.value = "loja cadastrada com sucesso!"
            }
            return result;
        } catch (e) {
            return e
        }
    }

    public async updateLoja(loja: Loja, id){
        try {
            let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`UPDATE IGNORE sorteio.loja SET NUMERO_LOJA = '${loja.NUMERO_LOJA}', RAZAO_SOCIAL = '${loja.RAZAO_SOCIAL}', ENDERECO = '${loja.ENDERECO}', BAIRRO = '${loja.BAIRRO}', CIDADE = '${loja.CIDADE}', CEP = '${loja.CEP}', CNPJ = '${loja.CNPJ}', IE = '${loja.IE}', TELEFONE = '${loja.TELEFONE}', EMAIL_PARA_XML_NFE = '${loja.EMAIL_PARA_XML_NFE}' where id > 0`)
            if (result.code == "error") {
                return new ReqResponse("error","erro inesperado")
            }else{
                result.value = "loja atualizada com sucesso!"
            }
            return result;
        } catch (e) {
            return e
        }
    }
    
    public async getLojaByCNPJ(CNPJ: any){
        let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`SELECT * FROM sorteio.loja where CNPJ like '%${CNPJ}%'`)
        if (result.code == "error") {
            return new ReqResponse("error","erro inesperado")
        }
        return result;
    }
    
    public async getLojaByID(id: any){
        let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`SELECT * FROM sorteio.loja where id = ${id}`)
        if (result.code == "error") {
            return new ReqResponse("error","erro inesperado")
        }
        return result;
    }

    public async delLoja(id: any){
        try {
            let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`DELETE FROM sorteio.loja where id = ${id}`)
            if (result.code == "error") {
                return new ReqResponse("error","erro inesperado")
            }else{
                result.value = "usuario deletado com sucesso!"
            }
            return result;
        } catch (error) {
            return error;
        }
    }

    public async getLojas(){
        try {
            let result:ReqResponse = await this.mysqlGateway.getQueryAsync("SELECT * FROM sorteio.loja")
            if (result.code == "error") {
                return new ReqResponse("error","erro inesperado")
            }
            return result;
        } catch (error) {
            return error;
        }
    }

}
