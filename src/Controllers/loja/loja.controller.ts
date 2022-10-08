import {
  Controller,
  Inject,
  Post,
  Body,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { ILojaService } from 'src/Domain/Interfaces/Services/i-loja-service.interface';
import * as Cnpj from '@fnando/cnpj';

@Controller('loja')
export class LojaController {
  constructor(
    @Inject('ILojaService') private readonly lojaService: ILojaService,
  ) {}

  @Get()
  public async getLojas(): Promise<any> {
    return this.lojaService.getLojas();
  }

  @Get(':id')
  public async getLojaByID(@Param('id') id: any): Promise<any> {
    return this.lojaService.getLojaByID(id);
  }

  @Get('cnpj/:cnpj')
  public async getLojaByCNPJ(@Param('cnpj') cnpj: any): Promise<any> {
    cnpj = Cnpj.format(cnpj);
    return this.lojaService.getLojaByCNPJ(cnpj);
  }

  @Post()
  public async addLoja(@Body() body: any): Promise<any> {
    return this.lojaService.addLoja(body);
  }

  @Post(':id')
  public async updateLoja(
    @Body() body: any,
    @Param('id') id: any,
  ): Promise<any> {
    return this.lojaService.updateLoja(body, id);
  }

  @Delete(':id')
  public async delLoja(@Param('id') id: any): Promise<any> {
    return this.lojaService.delLoja(id);
  }
}
