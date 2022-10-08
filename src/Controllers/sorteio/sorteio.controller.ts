import { Controller, Inject, Post, Body, Param, Header, HttpCode, Get, Res, Delete} from '@nestjs/common';
import path = require('path');
import { ISorteioService } from 'src/Domain/Interfaces/Services/i-sorteio-service.interface';

@Controller('sorteio')
export class SorteioController {

    constructor(@Inject('ISorteioService') private readonly sorteioService: ISorteioService) { }

    @Get()
    public async getSorteios(): Promise<any> {
        return this.sorteioService.getSorteios();
    }

    @Get(':id')
    public async getSorteioByID(@Param('id') id: any): Promise<any> {
        return this.sorteioService.getSorteioByID(id);
    }

    @Post()
    public async addSorteio(@Body() body: any): Promise<any> {
        return this.sorteioService.addSorteio(body);
    }
    
    @Get('sorteia/:id_usuario')
    public async Sortear(@Param('id_usuario') id_usuario: any): Promise<any> {
        return this.sorteioService.Sorteia(id_usuario);
    }

    @Get('envia-email/:id_sorteio')
    public async EnviaEmailSorteio(@Param('id_sorteio') id_sorteio: any): Promise<any> {
        return this.sorteioService.EnviaEmailSorteio(id_sorteio);
    }

    @Get('sorteados/get')
    public async Sorteados(): Promise<any> {
        return this.sorteioService.Sorteados();
    }

    @Delete()
    public async delSorteio(@Param('id') id: any): Promise<any> {
        return this.sorteioService.delSorteio(id);
    }
}
