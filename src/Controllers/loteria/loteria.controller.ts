import { Controller, Inject, Get } from '@nestjs/common';
import { ILoteriaService } from '../../Domain/Interfaces/Services/i-loteria-service.interface';

@Controller('loteria')
export class LoteriaController {
  constructor(
    @Inject('ILoteriaService') private readonly loteriaService: ILoteriaService,
  ) {}

  @Get()
  public async getResult(): Promise<any> {
    return this.loteriaService.getResult();
  }
}
