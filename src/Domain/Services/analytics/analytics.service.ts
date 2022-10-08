import { Injectable, Inject } from '@nestjs/common';
import * as _ from "lodash";
import { IMysqlGateway } from 'src/Domain/Interfaces/Gateway/i-mysql-gateway.interface';
import { IAnalyticsService } from 'src/Domain/Interfaces/Services/i-analytics-service.interface';
import { ReqResponse } from 'src/Domain/Models/ReqResponse';



@Injectable()
export class AnalyticsService implements IAnalyticsService {

    constructor(@Inject('IMysqlGateway') private readonly mysqlGateway: IMysqlGateway) { }
    
    public async getByPeriod(body: any): Promise<any> {
        try {
            
            let between = '';
            if(body.dataInicio != '' && body.dataFim != '' && body.dataInicio != undefined && body.dataFim != undefined )
                between = `WHERE dt_cadastro BETWEEN '${body.dataInicio}' AND '${body.dataFim}'`
            
            let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`SELECT 
                (SELECT COUNT(*) FROM user ${(between.length <= 0 ? '' : between)}) AS user,
                (SELECT COUNT(*) FROM cupom ${(between.length <= 0 ? '' : between)}) AS cupom,
                (SELECT COUNT(*) FROM voucher ${(between.length <= 0 ? '' : between)}) AS voucher,
                (SELECT COUNT(*) FROM sorteio ${(between.length <= 0 ? '' : between)}) AS sorteio,
                (SELECT COUNT(*) FROM retirada ${(between.length <= 0 ? '' : between)}) AS retirada,
                (SELECT SUM(valor_total) FROM cupom ${(between.length <= 0 ? '' : between)}) AS valor_total`)
            
            if (result.code == "error") {
                if(result.value.code == "ER_DUP_ENTRY")
                return new ReqResponse("error","erro inesperado")
            }

            return result;
        } catch (e) {
            return e
        }
    }


    public async getProductsByPeriod(body: any): Promise<any> {
        try {
            
            let between = '';
            if(body.dataInicio != '' && body.dataFim != '' && body.dataInicio != undefined && body.dataFim != undefined )
                between = `WHERE dt_cadastro BETWEEN '${body.dataInicio}' AND '${body.dataFim}'`
            
            let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`SELECT * FROM
             (SELECT nm_produto, cod_produtos, vl_produtos, unidade_medida_produtos, count(*) as num_repete FROM sorteio.produto ${(between.length <= 0 ? '' : between)} GROUP BY cod_produtos order by num_repete desc) dt `)
            
            if (result.code == "error") {
                if(result.value.code == "ER_DUP_ENTRY")
                return new ReqResponse("error","erro inesperado")
            }

            return result;
        } catch (e) {
            return e
        }
    }



    public async getVendasByPeriod(body: any): Promise<any> {
        try {
            
            let between = '';
            if(body.dataInicio != '' && body.dataFim != '' && body.dataInicio != undefined && body.dataFim != undefined )
                between = `WHERE dt_cadastro BETWEEN '${body.dataInicio}' AND '${body.dataFim}'`
            
            let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`SELECT * FROM (SELECT loja.assoc, loja.cnpj, loja.razao_social, loja.CIDADE, IFNULL(SUM(valor_total),0) AS total_compras, Count(distinct sorteio.cupom.id) AS num_cupom, Ifnull(Sum(valor_total) / Count(DISTINCT sorteio.cupom.id), 0) AS ticket_medio FROM sorteio.cupom RIGHT JOIN sorteio.loja ON loja.cnpj = cupom.cnpj ${(between.length <= 0 ? '' : between)} GROUP BY loja.cnpj ORDER BY num_cupom DESC) dt ORDER BY total_compras DESC`)
            
            if (result.code == "error") {
                if(result.value.code == "ER_DUP_ENTRY")
                return new ReqResponse("error","erro inesperado")
            }

            return result;
        } catch (e) {
            return e
        }
    }


    public async getMelhoresClientesByPeriod(body: any): Promise<any> {
        try {
            
            let between = '';
            if(body.dataInicio != '' && body.dataFim != '' && body.dataInicio != undefined && body.dataFim != undefined )
                between = `WHERE dt_cadastro BETWEEN '${body.dataInicio}' AND '${body.dataFim}'`
            
            let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`SELECT * FROM VW_COMPRA_USUARIO_WITH_VOUCHERS ${(between.length <= 0 ? '' : between)}`)
            
            if (result.code == "error") {
                if(result.value.code == "ER_DUP_ENTRY")
                return new ReqResponse("error","erro inesperado")
            }

            return result;
        } catch (e) {
            return e
        }
    }


    public async getCadastrosByPeriod(body: any): Promise<any> {
        try {
            
            let between = '';
            if(body.dataInicio != '' && body.dataFim != '' && body.dataInicio != undefined && body.dataFim != undefined )
                between = `WHERE dt_cadastro BETWEEN '${body.dataInicio}' AND '${body.dataFim}'`

            let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`select dt_cadastro, count(dt_cadastro) as num_cadastros
            from sorteio.user ${(between.length <= 0 ? '' : between)}
            group by dt_cadastro`)
            
            if (result.code == "error") {
                if(result.value.code == "ER_DUP_ENTRY")
                return new ReqResponse("error","erro inesperado")
            }

            return result;
        } catch (e) {
            return e
        }
    }

    public async getComprasByPeriod(body: any): Promise<any> {
        try {
            
            let between = '';
            if(body.dataInicio != '' && body.dataFim != '' && body.dataInicio != undefined && body.dataFim != undefined )
                between = `WHERE dt_cadastro BETWEEN '${body.dataInicio}' AND '${body.dataFim}'`

            let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`SELECT dt_cadastro, COUNT(dt_cadastro) AS
            num_compras, SUM(valor_total) AS valor_total FROM sorteio.cupom  ${(between.length <= 0 ? '' : between)}
            GROUP BY dt_cadastro`)
            
            if (result.code == "error") {
                if(result.value.code == "ER_DUP_ENTRY")
                return new ReqResponse("error","erro inesperado")
            }

            return result;
        } catch (e) {
            return e
        }
    }


    public async getFaixaEtariaByPeriod(body: any): Promise<any> {
        try {
            
            let between = '';
            if(body.dataInicio != '' && body.dataFim != '' && body.dataInicio != undefined && body.dataFim != undefined )
                between = `WHERE dt_cadastro BETWEEN '${body.dataInicio}' AND '${body.dataFim}'`

            let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`SELECT
            SUM(IF(age < 20,1,0)) as 'Menor que 20',
            SUM(IF(age BETWEEN 20 and 29,1,0)) as 'Entre 20 - 29',
            SUM(IF(age BETWEEN 30 and 39,1,0)) as 'Entre 30 - 39',
            SUM(IF(age BETWEEN 40 and 49,1,0)) as 'Entre 40 - 49',
            SUM(IF(age BETWEEN 50 and 59,1,0)) as 'Entre 50 - 59',
            SUM(IF(age BETWEEN 60 and 69,1,0)) as 'Entre 60 - 69',
            SUM(IF(age BETWEEN 70 and 79,1,0)) as 'Entre 70 - 79',
            SUM(IF(age >=80, 1, 0)) as 'Mais de 80',
            SUM(IF(age IS NULL, 1, 0)) as 'Não preenchido (NULL)'
            FROM (SELECT TIMESTAMPDIFF(YEAR, dt_nascimento, CURDATE()) AS age, dt_cadastro FROM sorteio.user_complemento join sorteio.user on user.cpf = user_complemento.cpf ${(between.length <= 0 ? '' : between)}) as derived`)
            
            if (result.code == "error") {
                if(result.value.code == "ER_DUP_ENTRY")
                return new ReqResponse("error","erro inesperado")
            }

            return result;
        } catch (e) {
            return e
        }
    }

}
