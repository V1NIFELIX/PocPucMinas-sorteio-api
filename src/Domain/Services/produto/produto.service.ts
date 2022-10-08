import { Injectable, Inject } from '@nestjs/common';

import * as path from "path"
import * as fs from "fs"
import * as _ from "lodash";
import { IMysqlGateway } from 'src/Domain/Interfaces/Gateway/i-mysql-gateway.interface';
import { ReqResponse } from '../../Models/ReqResponse';
import { IProdutoService } from 'src/Domain/Interfaces/Services/i-produto-service.interface';
import { Produto } from 'src/Domain/Models/Produto';



@Injectable()
export class ProdutoService implements IProdutoService {

    constructor(@Inject('IMysqlGateway') private readonly mysqlGateway: IMysqlGateway) { }


    public async addProdutos(produtos: Array<Produto>){
        try {
            var query = `INSERT INTO sorteio.produto (nm_produto, cod_produtos, qnt_produtos , unidade_medida_produtos, vl_produtos, cupom, user, dt_cadastro) VALUES `
            produtos.forEach(produto => {
                query += `('${produto.nm_produto}', '${produto.cod_produtos}', '${produto.qnt_produtos}', '${produto.unidade_medida_produtos}', '${produto.vl_produtos}', '${produto.cupom}', '${produto.user}', '${produto.dt_cadastro}'),`
            });
            query = query.slice(0, -1)
            let result:ReqResponse = await this.mysqlGateway.getQueryAsync(query)
            if (result.code == "error") {
                if(result.value.code == "ER_DUP_ENTRY")
                    return new ReqResponse("error","loja já existe")
            }else{
                result.value = "produto cadastrado com sucesso!"
            }
            return result;
        } catch (e) {
            return e
        }
    }

   
    
    public async getProdutoByID(id: any){
        let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`SELECT * FROM sorteio.produto where id = ${id}`)
        if (result.code == "error") {
            return new ReqResponse("error","erro inesperado")
        }
        return result;
    }

   

    public async getProdutos(){
        try {
            let result:ReqResponse = await this.mysqlGateway.getQueryAsync("SELECT * FROM sorteio.produto")
            if (result.code == "error") {
                return new ReqResponse("error","erro inesperado")
            }
            return result;
        } catch (error) {
            return error;
        }
    }

}
