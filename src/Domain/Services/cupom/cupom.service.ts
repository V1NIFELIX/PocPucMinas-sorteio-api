import { Injectable, Inject, Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { IMysqlGateway } from 'src/Domain/Interfaces/Gateway/i-mysql-gateway.interface';
import { ICupomService } from 'src/Domain/Interfaces/Services/i-cupom-service.interface';
import { IProdutoService } from 'src/Domain/Interfaces/Services/i-produto-service.interface';
import { Cupom } from 'src/Domain/Models/Cupom';
import { ReqResponse } from 'src/Domain/Models/ReqResponse';
import { CALENDARIO } from 'src/Domain/utils/calendario';
import { ILojaService } from 'src/Domain/Interfaces/Services/i-loja-service.interface';
import { IVoucherService } from 'src/Domain/Interfaces/Services/i-voucher-service.interface';
import { IEmailService } from 'src/Domain/Interfaces/Services/i-email-service.interface';
import moment = require('moment');

@Injectable()
export class CupomService implements ICupomService {
  private logger = new Logger(CupomService.name);
  constructor(
    @Inject('IMysqlGateway') private readonly mysqlGateway: IMysqlGateway,
    @Inject('IProdutoService') private readonly produtoService: IProdutoService,
    @Inject('ILojaService') private readonly lojasService: ILojaService,
    @Inject('IVoucherService') private readonly voucherService: IVoucherService,
    @Inject('IEmailService') private readonly emailService: IEmailService,
  ) {}

  public async getCupomByChave(chave: any) {
    let result: ReqResponse = await this.mysqlGateway.getQueryAsync(
      `SELECT * FROM sorteio.cupom where chave_nota_fiscal = '${chave}'`,
    );

    if (result.code == 'error') {
      return new ReqResponse('error', 'erro inesperado');
    }

    return result;
  }

  public async getCupomByUser(email: any) {
    let cupom: ReqResponse = await this.mysqlGateway.getQueryAsync(
      `SELECT * FROM sorteio.cupom WHERE user = '${email}'`,
    );

    for (let i in cupom.value) {
      let vouchers = await this.mysqlGateway.getQueryAsync(
        `SELECT * FROM sorteio.voucher WHERE cupom = ${cupom.value[i].ID}`,
      );
      if (vouchers.code == 'error') {
        return new ReqResponse('error', 'erro inesperado');
      }
      cupom.value[i].vouchers = vouchers.value;
    }

    if (cupom.code == 'error') {
      return new ReqResponse('error', 'erro inesperado');
    }

    return cupom;
  }

  public async getCupons() {
    try {
      let result: ReqResponse = await this.mysqlGateway.getQueryAsync(
        'SELECT * FROM sorteio.cupom',
      );
      if (result.code == 'error') {
        return new ReqResponse('error', 'erro inesperado');
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  public async getCupomByID(id: any) {
    let result: ReqResponse = await this.mysqlGateway.getQueryAsync(
      `SELECT * FROM sorteio.cupom where id = ${id}`,
    );
    if (result.code == 'error') {
      return new ReqResponse('error', 'erro inesperado');
    }
    return result;
  }

  public async addCupom(cupom: Cupom) {
    try {
      let insert = await this.mysqlGateway.getQueryAsync(
        `INSERT INTO sorteio.cupom (razao_social, dados_empresa, total_itens, valor_total, chave_nota_fiscal, quantidade_cupons, data_emissao, user, dt_cadastro,cnpj) VALUES ('${cupom.razao_social}', '${cupom.dados_empresa}', '${cupom.total_itens}', '${cupom.valor_total}', '${cupom.chave_nota_fiscal}', '${cupom.quantidade_cupons}', '${cupom.data_emissao}','${cupom.user}', '${cupom.dt_cadastro}', '${cupom.cnpj}')`,
      );
      cupom.produtos = cupom.produtos.map(produto => ({
        ...produto,
        user: cupom.user,
        cupom: insert.value.insertId,
        dt_cadastro: cupom.dt_cadastro,
      }));
      this.produtoService.addProdutos(cupom.produtos);
      if (insert.code == 'error') {
        if (insert.value.code == 'ER_DUP_ENTRY')
          return new ReqResponse('error', 'cupom já existe');
      }

      let result: ReqResponse = await this.mysqlGateway.getQueryAsync(
        `SELECT * FROM sorteio.cupom where chave_nota_fiscal = '${cupom.chave_nota_fiscal}'`,
      );
      if (result.code == 'error') {
        return new ReqResponse('error', 'erro inesperado');
      }

      return result;
    } catch (e) {
      return e;
    }
  }

  public async delCupom(id: any) {
    try {
      let result: ReqResponse = await this.mysqlGateway.getQueryAsync(
        `DELETE FROM sorteio.cupom where id = ${id}`,
      );
      if (result.code == 'error') {
        return new ReqResponse('error', 'erro inesperado');
      } else {
        result.value = 'cupom deletado com sucesso!';
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  public async gerarVoucherValido(length: number): Promise<any> {
    let codigo = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      codigo += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const existeVoucher = await this.voucherService.getVoucherByCodigo(codigo);

    if (existeVoucher.value.length > 0) {
      await this.gerarVoucherValido(6);
    }

    return codigo;
  }
  public async checkCupom(message: any) {
    const verificaDataPeriodo = CALENDARIO.includes(
      message.notaFiscal.data_emissao,
    );
    this.logger.log(
      'Iniciando cadastro de cupom. NotaFiscal: ' +
        message.notaFiscal.chave_nota_fiscal,
    );
    if (verificaDataPeriodo) {
      const verificaExisteCupom = await this.getCupomByChave(
        message.notaFiscal.chave_nota_fiscal,
      );
      if (verificaExisteCupom.value.length == 0) {
        const verificaCNPJ = await this.lojasService.getLojaByCNPJ(
          message.notaFiscal.cnpj,
        );
        if (verificaCNPJ.value.length > 0) {
          if (message.notaFiscal.quantidade_cupons > 0) {
            let dataEmissao = message.notaFiscal.data_emissao;
            message.notaFiscal.data_emissao =
              dataEmissao.split('/')[2] +
              '-' +
              dataEmissao.split('/')[1] +
              '-' +
              dataEmissao.split('/')[0];
            this.logger.log(
              'AddCupom: ' +
                JSON.stringify({
                  ...message.notaFiscal,
                  dt_cadastro: moment(new Date()).format('YYYY-MM-DD'),
                  user: message.user,
                  dados_empresa: message.notaFiscal.dados_empresa.join(' '),
                }),
            );
            const cupom = await this.addCupom({
              ...message.notaFiscal,
              dt_cadastro: moment(new Date()).format('YYYY-MM-DD'),
              user: message.user,
              dados_empresa: message.notaFiscal.dados_empresa.join(' '),
            });
            let codigosVouchersGerados = [];
            for (
              let index = 0;
              index < Math.floor(message.notaFiscal.quantidade_cupons);
              index++
            ) {
              const voucher = await this.gerarVoucherValido(6);
              this.logger.log(
                'AddVoucher: ' +
                  JSON.stringify({
                    codigo: voucher,
                    cupom: cupom.value[0].ID,
                    user: message.user,
                    sorteado: false,
                    retirou_premio: false,
                    dt_cadastro: moment(new Date()).format('YYYY-MM-DD'),
                  }),
              );
              this.voucherService.addVoucher({
                codigo: voucher,
                cupom: cupom.value[0].ID,
                user: message.user,
                sorteado: false,
                retirou_premio: false,
                dt_cadastro: moment(new Date()).format('YYYY-MM-DD'),
              });
              codigosVouchersGerados.push(voucher);
            }
            this.logger.log('Cadastro sucedido');
            this.emailService.sendEmailNumerosSorteio(
              message.user,
              codigosVouchersGerados.toString().replace(/,/g, ',<br>'),
            );
          } else {
            // valor minimo nao atingido
            this.logger.error(
              'Valor minimo nao atingido. Nota: ' +
                message.notaFiscal.chave_nota_fiscal,
            );
            this.emailService.sendEmailErro(
              message.user,
              'Verificamos que essa compra não possui o valor mínimo para participar da promoção, continue comprando e validando seus cupons no período de promoção para aumentar suas chances de ganhar.',
            );
          }
        } else {
          // cnpj nao é valido
          this.logger.error(
            'CNPJ nao é valido. Nota: ' + message.notaFiscal.chave_nota_fiscal,
          );
          this.emailService.sendEmailErro(
            message.user,
            'Verificamos que essa compra não foi efetuada em uma de nossas lojas participantes, continue comprando e validando seus cupons no período de promoção para aumentar suas chances de ganhar.',
          );
        }
      } else {
        // existe cupom
        this.logger.error(
          'Cupom já existe no banco. Nota: ' +
            message.notaFiscal.chave_nota_fiscal,
        );
        this.emailService.sendEmailErro(
          message.user,
          'Verificamos que essa compra já foi cadastrada, continue comprando e validando seus cupons no período de promoção para aumentar suas chances de ganhar.',
        );
      }
    } else {
      // nao está na data periodo
      this.logger.error(
        'Compra feita fora da data período. Nota: ' +
          message.notaFiscal.chave_nota_fiscal,
      );
      this.emailService.sendEmailErro(
        message.user,
        'Verificamos que essa compra não foi efetuada durante o periodo da promoção, continue comprando e validando seus cupons no período de promoção para aumentar suas chances de ganhar.',
      );
    }
  }
}
