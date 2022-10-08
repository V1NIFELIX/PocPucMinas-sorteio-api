import {
  Controller,
  Inject,
  Post,
  Body,
  Param,
  Header,
  HttpCode,
  Get,
  Res,
  Delete,
} from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import path = require('path');
import { GerarCupomMessage } from 'src/Domain/Interfaces/Messages/i-gerar-cupom-message';
import { ICupomService } from 'src/Domain/Interfaces/Services/i-cupom-service.interface';
import { isNullOrEmpty } from 'src/Domain/utils/isNullOrEmpty';

@Controller('cupom')
export class CupomController {
  constructor(
    @Inject('ICupomService') private readonly cupomService: ICupomService,
  ) {}

  @Get()
  public async getCupons(): Promise<any> {
    return this.cupomService.getCupons();
  }

  @Get(':id')
  public async getCupomByID(@Param('id') id: any): Promise<any> {
    return this.cupomService.getCupomByID(id);
  }

  @Get('user-cupom/:id')
  public async getCupomByUser(@Param('id') email: any): Promise<any> {
    return this.cupomService.getCupomByUser(email);
  }

  @Get('chave-cupom/:chave')
  public async getCupomByChave(@Param('chave') chave: any): Promise<any> {
    return this.cupomService.getCupomByChave(chave);
  }

  @Post()
  public async addCupom(@Body() body: any): Promise<any> {
    return this.cupomService.addCupom(body);
  }

  @Delete(':id')
  public async delCupom(@Param('id') id: any): Promise<any> {
    return this.cupomService.delCupom(id);
  }

  @Post('qrcode')
  public async addCupomRMQ(@Body() body: any): Promise<any> {
    const conn = require('amqplib').connect(process.env.RABBIT_URL);

    conn
      .then((finishedConnection) => {
        return finishedConnection.createChannel();
      })
      .then((channel) => {
        if (
          isNullOrEmpty(body.chave) ||
          isNullOrEmpty(body.user) ||
          isNullOrEmpty(body.cpf)
        ) {
          throw new Error(
            'Dados enviados pelo front estão incompletos. Body: ' +
              JSON.stringify(body),
          );
        }
        return channel
          .assertQueue(process.env.RABBITMQ_PRODUCER_QUEUE_NAME)
          .then((ok) => {
            const message = {
              pattern: process.env.NFE_PATTERN,
              chave: body.chave,
              user: body.user,
              cpf: body.cpf,
            };
            return channel.sendToQueue(
              process.env.RABBITMQ_PRODUCER_QUEUE_NAME,
              Buffer.from(JSON.stringify(message)),
            );
          });
      })
      .catch((error) => {
        return error;
      });
  }

  @EventPattern('gerar_cupom')
  public async GerarCupom(
    @Payload() message: GerarCupomMessage,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.cupomService.checkCupom(
        JSON.parse(originalMsg.content.toString()),
      );
      await channel.ack(originalMsg);
    } catch (error) {
      await channel.nack(originalMsg, false, true);
    }
  }
}
