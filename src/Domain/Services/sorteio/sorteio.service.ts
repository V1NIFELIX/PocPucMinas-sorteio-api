import {
    Injectable,
    Inject
} from '@nestjs/common';
import * as _ from "lodash";
import {
    IMysqlGateway
} from 'src/Domain/Interfaces/Gateway/i-mysql-gateway.interface';
import {
    ISorteioService
} from 'src/Domain/Interfaces/Services/i-sorteio-service.interface';
import {
    ReqResponse
} from 'src/Domain/Models/ReqResponse';
import {
    Sorteio
} from 'src/Domain/Models/Sorteio';
import * as moment from 'moment'
import { IVoucherService } from 'src/Domain/Interfaces/Services/i-voucher-service.interface';
import { ILoteriaService } from 'src/Domain/Interfaces/Services/i-loteria-service.interface';
import { IUserService } from 'src/Domain/Interfaces/Services/i-user-service.interface';
import { IEmailService } from 'src/Domain/Interfaces/Services/i-email-service.interface';
import { ICupomService } from 'src/Domain/Interfaces/Services/i-cupom-service.interface';
import { ILojaService } from 'src/Domain/Interfaces/Services/i-loja-service.interface';

@Injectable()
export class SorteioService implements ISorteioService {

    constructor(@Inject('IMysqlGateway') private readonly mysqlGateway: IMysqlGateway,
        @Inject('IVoucherService') private readonly voucherService: IVoucherService,
        @Inject('ICupomService') private readonly cupomService: ICupomService,
        @Inject('IUserService') private readonly userService: IUserService,
        @Inject('IEmailService') private readonly emailService: IEmailService,
        @Inject('ILojaService') private readonly lojaService: ILojaService,
        @Inject('ILoteriaService') private readonly loteriaService: ILoteriaService) { }



    public async updateSorteio(id: any) {
        try {
            let result: ReqResponse = await this.mysqlGateway.getQueryAsync(`
                UPDATE IGNORE sorteio.sorteio 
                SET email_enviado = true 
                where ID = '${id}' AND ID > 0`)
            if (result.code == "error") {
                return new ReqResponse("error", "erro inesperado")
            } else {
                result.value = "sorteio atualizado com sucesso!"
            }
            return result;
        } catch (e) {
            return e
        }
    }


    async Sorteados() {
        try {
            let result: ReqResponse = await this.mysqlGateway.getQueryAsync("SELECT * FROM sorteio.sorteio WHERE email_enviado = 1")
            if (result.code == "error") {
                return new ReqResponse("error", "erro inesperado")
            }
            var vouchersList = [];
            var vouchers = [];


            await result.value.forEach(obj => {
                vouchersList.push(obj.voucher.split(","))
            });


            await this.asyncForEach(vouchersList, async (lista, i) => {
                await this.asyncForEach(lista, async (x, i) => {
                    let vch = await this.mysqlGateway.getQueryAsync(`SELECT * FROM sorteio.voucher WHERE codigo = ${x}`);
                    vouchers.push(vch.value[0]);
                    let user = await this.mysqlGateway.getQueryAsync(`SELECT nome FROM sorteio.user WHERE email = '${vch.value[0].user}'`);
                    vch.value[0].user = user.value[0]
                    let cupom = await this.mysqlGateway.getQueryAsync(`SELECT cnpj FROM sorteio.cupom WHERE ID = '${vch.value[0].cupom}'`);
                    vch.value[0].cupom = cupom.value[0]
                    let loja = await this.mysqlGateway.getQueryAsync(`SELECT BAIRRO,CIDADE FROM sorteio.loja WHERE CNPJ = '${vch.value[0].cupom.cnpj}'`);
                    vch.value[0].cupom.loja = loja.value[0]
                })
            })

            let dados = this.separar(vouchers, 14);

            await this.asyncForEach(result.value, async (obj, i) => {
                obj.voucher = dados[i];
            });

            return result;

        } catch (error) {
            return error;
        }
    }

    separar(base, maximo) {
        var resultado = [[]];
        var grupo = 0;

        for (var indice = 0; indice < base.length; indice++) {
            if (resultado[grupo] === undefined) {
                resultado[grupo] = [];
            }

            resultado[grupo].push(base[indice]);

            if ((indice + 1) % maximo === 0) {
                grupo = grupo + 1;
            }
        }

        return resultado;
    }

    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    public async getSorteios() {
        try {
            let result: ReqResponse = await this.mysqlGateway.getQueryAsync("SELECT * FROM sorteio.sorteio")
            if (result.code == "error") {
                return new ReqResponse("error", "erro inesperado")
            }
            var vouchersList = [];
            var vouchers = [];


            await result.value.forEach(obj => {
                vouchersList.push(obj.voucher.split(","))
            });

            await this.asyncForEach(vouchersList, async (lista, i) => {
                await this.asyncForEach(lista, async (x, i) => {
                    let vch = await this.mysqlGateway.getQueryAsync(`SELECT * FROM sorteio.voucher WHERE codigo = ${x}`);
                    vouchers.push(vch.value[0]);

                    let user = await this.mysqlGateway.getQueryAsync(`SELECT nome,cpf,bairro,telefone,instagram,email FROM sorteio.user WHERE email = '${vch.value[0].user}'`);
                    vch.value[0].user = user.value[0]

                    let cupom = await this.mysqlGateway.getQueryAsync(`SELECT * FROM sorteio.cupom WHERE ID = '${vch.value[0].cupom}'`);
                    vch.value[0].cupom = cupom.value[0]
                    let loja = await this.mysqlGateway.getQueryAsync(`SELECT * FROM sorteio.loja WHERE CNPJ = '${cupom.value[0].cnpj}'`);
                    vch.value[0].loja = loja.value[0]
                })
            })

            let dados = this.separar(vouchers, 14);

            await this.asyncForEach(result.value, async (obj, i) => {
                obj.voucher = dados[i];
            });

            return result;

        } catch (error) {
            return error;
        }
    }

    public async getSorteioByID(id: any) {
        let result: ReqResponse = await this.mysqlGateway.getQueryAsync(`SELECT * FROM sorteio.sorteio where id = ${id}`)
        if (result.code == "error") {
            return new ReqResponse("error", "erro inesperado")
        }
        return result;
    }

    public async addSorteio(sorteio: Sorteio) {
        try {
            let result: ReqResponse = await this.mysqlGateway.getQueryAsync(`INSERT INTO sorteio.sorteio (voucher, usuario_que_fez_o_sorteio, numeros_loteria, concurso, dt_cadastro,email_enviado) VALUES ('${sorteio.voucher}', '${sorteio.usuario_que_fez_o_sorteio}', '${sorteio.numeros_loteria}', '${sorteio.concurso}', '${sorteio.dt_cadastro}', ${sorteio.email_enviado})`)
            if (result.code == "error") {
                if (result.value.code == "ER_DUP_ENTRY")
                    return new ReqResponse("error", "sorteio já existe")
            } else {
                result.value = "sorteio cadastrado com sucesso!"
            }
            return result;
        } catch (e) {
            return e
        }
    }

    public async delSorteio(id: any) {
        try {
            let result: ReqResponse = await this.mysqlGateway.getQueryAsync(`DELETE FROM sorteio.sorteio where id = ${id}`)
            if (result.code == "error") {
                return new ReqResponse("error", "erro inesperado")
            } else {
                result.value = "sorteio deletado com sucesso!"
            }
            return result;
        } catch (error) {
            return error;
        }
    }



    insert(voucher, numeros_loteria, concurso, usuario_que_fez_o_sorteio) {
        let data = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        let sorteio = new Sorteio
        sorteio.numeros_loteria = numeros_loteria,
            sorteio.dt_cadastro = data,
            sorteio.voucher = voucher,
            sorteio.usuario_que_fez_o_sorteio = usuario_que_fez_o_sorteio
        sorteio.concurso = concurso
        sorteio.email_enviado = false
        return this.addSorteio(sorteio);
    }

    valorMaisProximo(ideais, valor) {
        var lo = -1,
            hi = ideais.length;
        while (hi - lo > 1) {
            var mid = Math.round((lo + hi) / 2);
            if (ideais[mid] <= valor) {
                lo = mid;
            } else {
                hi = mid;
            }
        }
        if (ideais[lo] == valor) hi = lo;
        return [ideais[lo], ideais[hi]];
    }

    pegaSerie(val, index) {
        return Math.floor(
            (
                val / Math.pow(10, Math.floor(Math.log(Math.abs(val)) / Math.LN10) - index)
            ) %
            10
        );
    };

    geraDataSemanaSorteio() {
        var listDate = [];
        var startDate = moment(new Date()).subtract(7, 'days').format('YYYY-MM-DD');
        var endDate = moment(new Date()).format('YYYY-MM-DD');
        var dateMove = new Date(startDate);
        var strDate = startDate;

        while (strDate < endDate) {
            var strDate = dateMove.toISOString().slice(0, 10);
            listDate.push(strDate);
            dateMove.setDate(dateMove.getDate() + 1);
        };
        listDate.splice(-1, 1)
        listDate.splice(-1, 1)
        listDate.splice(-1, 1)
        return listDate;
    }

    AddZeroEsquerda(number, length) {
        var my_string = '' + number;
        while (my_string.length < length) {
            my_string = '0' + my_string;
        }
        return my_string;
    }


    AddZeroDireita(number, length) {
        var my_string = '' + number;
        while (my_string.length < length) {
            my_string = my_string + '0';
        }
        return my_string;
    }


    async verificaGanhador(numeros_loteria, vouchers_codigos) {
        let serie_numeros_loteria = this.pegaSerie(numeros_loteria, 0);
        let valor_mais_proximo = this.valorMaisProximo(vouchers_codigos, numeros_loteria);
        if (valor_mais_proximo.length == 2) {
            valor_mais_proximo = valor_mais_proximo[1]
        } else {
            valor_mais_proximo = valor_mais_proximo[0]
        }

        if (valor_mais_proximo != undefined) {
            let serie_valor_mais_proximo = this.pegaSerie(valor_mais_proximo, 0);
            if (serie_valor_mais_proximo > serie_numeros_loteria) {
                valor_mais_proximo = this.valorMaisProximo(vouchers_codigos, this.AddZeroDireita(serie_numeros_loteria, 5));
                if (valor_mais_proximo.length == 2) {
                    valor_mais_proximo = valor_mais_proximo[1]
                } else {
                    valor_mais_proximo = valor_mais_proximo[0]
                }
            }
        } else {
            serie_numeros_loteria = serie_numeros_loteria + 1;
            if (serie_numeros_loteria >= 9) {
                serie_numeros_loteria = 0
            }
            valor_mais_proximo = this.valorMaisProximo(vouchers_codigos, this.AddZeroDireita(serie_numeros_loteria, 5));
            if (valor_mais_proximo.length == 2) {
                valor_mais_proximo = valor_mais_proximo[1]
            } else {
                valor_mais_proximo = valor_mais_proximo[0]
            }
        }
        return valor_mais_proximo;
    }

    pegaUltimoItem(array) {
        return array[array.length - 1];
    }


    async getNumerosLoteria() {
        let result = await this.loteriaService.getResult();
        if (result.data == "error") {
            result = await this.loteriaService.getResult();
            if (result.data == "error") {
                result = await this.loteriaService.getResult();
            }
        }
        result = {
            numeros: result.data['valorSorteio'],
            concurso: result.data['concurso']
        }
        return result;
    }


    async getSorteado_pricipal(cuponsNaoSorteados, numeros_loteria) {
        cuponsNaoSorteados.value.forEach(obj => {
            obj.dt_cadastro = moment(obj.dt_cadastro).format('YYYY-MM-DD');
        });
        var diasSemanaValidos = await this.geraDataSemanaSorteio()
        var verificaDiasValidos = function (item) {
            return diasSemanaValidos.includes(item.dt_cadastro);
        }
        var vouchers = await cuponsNaoSorteados.value.filter(verificaDiasValidos);
        var vouchers_codigos = []

        await vouchers.forEach(voucher => {
            vouchers_codigos.push(voucher.codigo)
        });

        //caso o exista exatamente o mesmo numero no db
        await vouchers.forEach(voucher => {
            if (voucher.codigo == numeros_loteria['numeros']) {
                return ({ codigo: voucher, vouchers_codigos: vouchers_codigos })
            }
        });

        // caso nao exista
        let valorMaisProximo = await this.verificaGanhador(numeros_loteria['numeros'], vouchers_codigos)
        let ganhador_principal = vouchers.filter(x => x.codigo == valorMaisProximo)
        return ({ codigo: ganhador_principal, vouchers_codigos: vouchers_codigos })
    }

    async lastItem(array) {
        return await array[array.length - 1];
    }

    async firstItem(array) {
        return await array[0];
    }

    async Sorteia(usuario__que_sorteou) {
        let diasSemanaValidos = await this.geraDataSemanaSorteio()
        let dia_inicial = await this.firstItem(diasSemanaValidos)
        let dia_final = await this.lastItem(diasSemanaValidos)
        let numeros_loteria_bnkp = await this.getNumerosLoteria();
        let numeros_loteria = await this.getNumerosLoteria();
        let ganhadores = []
        let tamanho_sorteados = 13
        while (ganhadores.length <= tamanho_sorteados) {
            let cuponsNaoSorteados = await this.voucherService.getVouchersNaoSorteados(dia_inicial, dia_final, numeros_loteria.numeros);
            let serie_numeros_loteria = this.pegaSerie(Number(numeros_loteria.numeros), 0);
            for (let index = 0; index <= tamanho_sorteados; index++) {
                const ganhador = cuponsNaoSorteados.value[0][index];

                if (ganhador) {
                    if (ganhadores.length <= tamanho_sorteados) {
                        if (!ganhadores.includes(ganhador.codigo)) {
                            ganhadores.push(ganhador.codigo)
                        }
                    }
                }
                else {
                    let ganhador_atual = await this.lastItem(ganhadores)
                    let serie_ganhador_atual = await this.pegaSerie(Number(ganhador_atual), 0)
                    if (Number(ganhador_atual) >= 999999) {
                        numeros_loteria.numeros = 0
                    } else {
                        if (ganhadores.includes(ganhador_atual) && numeros_loteria.numeros == serie_ganhador_atual) {
                            numeros_loteria.numeros = (serie_numeros_loteria + 1)
                            if (numeros_loteria.numeros == 10) {
                                numeros_loteria.numeros = 0
                            }
                            break;
                        } else {
                            numeros_loteria.numeros = serie_numeros_loteria
                            break;
                        }
                    }
                }
            }
        }

        let insert = await this.insert(ganhadores.toString(), numeros_loteria_bnkp['numeros'], numeros_loteria_bnkp['concurso'], usuario__que_sorteou);
        return insert
    }

    async EnviaEmailSorteio(id_sorteio) {

        let result: ReqResponse = await this.getSorteioByID(id_sorteio);
        let ganhadores = result.value[0].voucher.split(',')
        ganhadores.forEach(async ganhador => {
            let info_voucher_ganhador = await this.voucherService.getVoucherByCodigo(ganhador);
            let info__ganhador = await this.userService.getUserByEmail(info_voucher_ganhador['value'][0]['user']);
            let info__cupom = await this.cupomService.getCupomByID(info_voucher_ganhador['value'][0]['cupom']);
            let loja = await this.lojaService.getLojaByCNPJ(info__cupom['value'][0]['cnpj']);
            info_voucher_ganhador['value'][0]['sorteado'] = true;
            info_voucher_ganhador['value'][0]['dt_cadastro'] = moment(info_voucher_ganhador['value'][0]['dt_cadastro']).format('YYYY-MM-DD');
            await this.voucherService.updateVoucher(info_voucher_ganhador['value'][0], info_voucher_ganhador['value'][0]['codigo'])
            await this.emailService.sendEmailVencedor(`flavia@agenciaecom.com.br,wr@agenciaecom.com.br,sorteio@redemultimarket.com.br,${info_voucher_ganhador['value'][0]['user']}`, info__cupom['value'][0]['chave_nota_fiscal'], info__ganhador['value'][0]['nome'], info__ganhador['value'][0]['cpf'], info__cupom['value'][0]['valor_total'], info_voucher_ganhador['value'][0]['codigo']);
            await this.emailService.sendEmailLojaSorteio(`flavia@agenciaecom.com.br,wr@agenciaecom.com.br,sorteio@redemultimarket.com.br,${loja['value'][0]['EMAIL_PARA_XML_NFE']}`, info__cupom['value'][0]['chave_nota_fiscal'], info__ganhador['value'][0]['nome'], info__ganhador['value'][0]['cpf'], info__cupom['value'][0]['valor_total'], info_voucher_ganhador['value'][0]['codigo']);
        });
        let update = await this.updateSorteio(id_sorteio);
        return update;
    }


}