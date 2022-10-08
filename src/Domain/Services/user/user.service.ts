import { Injectable, Inject } from '@nestjs/common';

import * as path from "path"
import * as _ from "lodash";
import { IUserService } from 'src/Domain/Interfaces/Services/i-user-service.interface';
import { IMysqlGateway } from 'src/Domain/Interfaces/Gateway/i-mysql-gateway.interface';
import { User } from 'src/Domain/Models/User';
import { ReqResponse } from '../../Models/ReqResponse';
import moment = require('moment');
import converXml  = require('xml-js');
import { IRestGateway } from 'src/Domain/Interfaces/Gateway/i-rest-gateway.interface';



@Injectable()
export class UserService implements IUserService {

    constructor(@Inject('IRestGateway') private readonly restGateway: IRestGateway,
        @Inject('IMysqlGateway') private readonly mysqlGateway: IMysqlGateway) { }
   
    public async getUserByEmail(email: any): Promise<any> {
        let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`SELECT * FROM sorteio.user where email = '${email}'`)
        result.value[0].password = ""
        if (result.code == "error") {
            return new ReqResponse("error","erro inesperado")
        }
        return result;
    }

    public async addUser(user: User){
        try {
            let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`INSERT INTO sorteio.user (nome, cpf, bairro, telefone, instagram, email, password, role, dt_cadastro, termos) VALUES ('${user.nome}', '${user.cpf}', '${user.bairro}', '${user.telefone}', '${user.instagram}', '${user.email}', '${user.password}', '${user.role}', '${user.dt_cadastro}', ${user.termos})`)
            if (result.code == "error") {
                if(result.value.code == "ER_DUP_ENTRY")
                    return new ReqResponse("error","usuario já existe")
            }else{
                result.value = "usuario cadastrado com sucesso!"
            }
            return result;
        } catch (e) {
            return e
        }
    }

    public async updateUser(user: User, id){
        try {
            let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`UPDATE IGNORE sorteio.user SET nome = '${user.nome}', cpf = '${user.cpf}', bairro = '${user.bairro}', telefone = '${user.telefone}', instagram = '${user.instagram}', email = '${user.email}', password = '${user.password}', role = '${user.role}' , termos = ${user.termos}  where id > 0`)
            if (result.code == "error") {
                return new ReqResponse("error","erro inesperado")
            }else{
                result.value = "usuario atualizado com sucesso!"
            }
            return result;
        } catch (e) {
            return e
        }
    }
    
    
    public async getUserByID(id: any){
        let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`SELECT * FROM sorteio.user where id = ${id}`)
        result.value[0].password = ""
        if (result.code == "error") {
            return new ReqResponse("error","erro inesperado")
        }
        return result;
    }

    public async bloqueiaUserByEmail(email: any){
        let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`INSERT INTO sorteio.bloqueados (user, dt_cadastro) values ('${email}','${moment(new Date()).format('YYYY-MM-DD')}')`)
        if (result.code == "error") {
            return new ReqResponse("error","erro inesperado")
        }
        return result;
    }

    public async bloqueados(){
        let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`SELECT * FROM sorteio.bloqueados`)
        if (result.code == "error") {
            return new ReqResponse("error","erro inesperado")
        }
        return result;
    }

    public async bloqueadoByEmail(email){
        let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`SELECT * FROM sorteio.bloqueados where user = '${email}'`)
        if (result.code == "error") {
            return new ReqResponse("error","erro inesperado")
        }
        return result;
    }

    public async delUser(id: any){
        try {
            let result:ReqResponse = await this.mysqlGateway.getQueryAsync(`DELETE FROM sorteio.user where id = ${id}`)
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

    public async getUsers(){
        try {
            let result:ReqResponse = await this.mysqlGateway.getQueryAsync("SELECT * FROM sorteio.user")
            if (result.code == "error") {
                return new ReqResponse("error","erro inesperado")
            }
            return result;
        } catch (error) {
            return error;
        }
    }


    public async getUsersSemComplemento(){
        try {
            let result:ReqResponse = await this.mysqlGateway.getQueryAsync("SELECT cpf FROM sorteio.user WHERE NOT EXISTS( SELECT NULL FROM sorteio.user_complemento WHERE user.cpf = user_complemento.cpf) and cpf not like '%CADASTRO%'")
            if (result.code == "error") {
                return new ReqResponse("error","erro inesperado")
            }
            return result;
        } catch (error) {
            return error;
        }
    }


    public async updateUsersComplemento(){
        try {
            let users = await this.getUsersSemComplemento();
            await this.asyncForEach(users.value, async (user) => {
                console.log(user.cpf)
                let cpf = await this.getCPFConsult(user.cpf);
                if (cpf.data != '<ROOT/>\r\n') {
                    let obj = await this.createOBJcpf(cpf.data)
                    let query =  `INSERT INTO sorteio.user_complemento (cpf, nome, dt_nascimento, rua, numero, complemento, bairro, cep, municipio, uf, nome_mae) VALUES ('${obj['NRCPF']}', '${obj['NOPESSOAFISICA']}', '${moment(obj['DTNASCIMENTO'],'DD/MM/YYYY').format('YYYY-MM-DD')}', '${obj['NOLOGRADOURO']}', '${obj['NRLOGRADOURO']}', '${obj['DSCOMPLEMENTO']}', '${obj['NOBAIRRO']}', '${obj['NRCEP']}', '${obj['NOMUNICIPIO']}', '${obj['SGUF']}', '${obj['NOMAE']}');`
                    await this.mysqlGateway.getQueryAsync(query)
                }
            });
            console.log("Acabou")
        } catch (error) {
            return error;
        }
    }

    async createOBJcpf(obj){
        try {
            let user = JSON.parse(converXml.xml2json(obj))
            if (obj != null || obj != undefined) {
                return user['elements'][0]['elements'][0]['attributes']
            }
        } catch (e) {
            console.log(e)
        }
       
    }

    async getCPFConsult(cpf){
        return await this.restGateway.Get(`${process.env.URL_CPF_API}?cpf=${cpf}`);
    }
    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            console.log("Falta: ", array.length - index)
            await callback(array[index], index, array);
        }
    }

}
