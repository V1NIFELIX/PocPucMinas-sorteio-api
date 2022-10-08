import { IRetiradaService } from './../../Interfaces/Services/i-retirada-service.interface';
import { Injectable, Inject } from '@nestjs/common';

import * as path from "path"
import * as fs from "fs"
import * as _ from "lodash";
import { IMysqlGateway } from 'src/Domain/Interfaces/Gateway/i-mysql-gateway.interface';
import { ReqResponse } from '../../Models/ReqResponse';
import { Retirada } from 'src/Domain/Models/retirada';



@Injectable()
export class RetiradaService implements IRetiradaService {

    constructor(@Inject('IMysqlGateway') private readonly mysqlGateway: IMysqlGateway) { }


    public async addRetirada(retirada: Retirada){
        try {
            let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`INSERT INTO sorteio.retirada (cpf_funcionario,id_loja,voucher,usuario_logado,dt_cadastro,dt_retirada) VALUES ('${retirada.cpf_funcionario}', '${retirada.id_loja}', '${retirada.voucher}', '${retirada.usuario_logado}', '${retirada.dt_cadastro}', '${retirada.dt_retirada}')`)
            if (result.code == "error") {
                if(result.value.code == "ER_DUP_ENTRY")
                    return new ReqResponse("error","retirada já existe")
            }else{
                result.value = "retirada cadastrada com sucesso!"
            }
            return result;
        } catch (e) {
            return e
        }
    }

    public async getRetiradas(){
        try {
            let result:ReqResponse = await this.mysqlGateway.getQueryAsync("SELECT * FROM sorteio.retirada")
            if (result.code == "error") {
                return new ReqResponse("error","erro inesperado")
            }
            return result;
        } catch (error) {
            return error;
        }
    }

}
