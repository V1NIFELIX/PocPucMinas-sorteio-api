import { Controller, Inject, Post, Body, Param, Header, HttpCode, Get, Res, Delete} from '@nestjs/common';
import path = require('path');
import { IAnalyticsService } from 'src/Domain/Interfaces/Services/i-analytics-service.interface';

@Controller('analytics')
export class AnalyticsController {

    constructor(@Inject('IAnalyticsService') private readonly analyticsService: IAnalyticsService ) { }
   
    @Post()
    public async getByPeriod(@Body() body: any): Promise<any> {
        return this.analyticsService.getByPeriod(body);
    }

    @Post('products')
    public async getProductsByPeriod(@Body() body: any): Promise<any> {
        return this.analyticsService.getProductsByPeriod(body);
    }

    @Post('vendas')
    public async getVendasByPeriod(@Body() body: any): Promise<any> {
        return this.analyticsService.getVendasByPeriod(body);
    }

    @Post('clientes')
    public async getMelhoresClientesByPeriod(@Body() body: any): Promise<any> {
        return this.analyticsService.getMelhoresClientesByPeriod(body);
    }

    @Post('cadastros')
    public async getCadastrosByPeriod(@Body() body: any): Promise<any> {
        return this.analyticsService.getCadastrosByPeriod(body);
    }

    @Post('compras')
    public async getComprasByPeriod(@Body() body: any): Promise<any> {
        return this.analyticsService.getComprasByPeriod(body);
    }

    
    @Post('faixa-etaria')
    public async getFaixaEtariaByPeriod(@Body() body: any): Promise<any> {
        return this.analyticsService.getFaixaEtariaByPeriod(body);
    }
}
