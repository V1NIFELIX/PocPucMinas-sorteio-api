import { Controller, Inject, Post, Body, Param, Header, HttpCode, Get, Res, Delete} from '@nestjs/common';
import path = require('path');
import { IRetiradaService } from 'src/Domain/Interfaces/Services/i-retirada-service.interface';


@Controller('retirada')
export class RetiradaController {

    constructor(@Inject('IRetiradaService') private readonly retiradaService: IRetiradaService) { }

    @Get()
    public async getRetiradas(): Promise<any> {
        return this.retiradaService.getRetiradas();
    }

    @Post()
    public async addRetirada(@Body() body: any): Promise<any> {
        return this.retiradaService.addRetirada(body);
    }

}
