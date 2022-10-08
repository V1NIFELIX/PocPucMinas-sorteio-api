import { Controller, Inject, Post, Body, Param, Header, HttpCode, Get, Res} from '@nestjs/common';
import path = require('path');
import { IReportService } from 'src/Domain/Interfaces/Services/i-report-service.interface';



@Controller('report')
export class ReportController {

    constructor(@Inject('IReportService') private readonly reportService: IReportService) { }


    @Post('generate-report/:template')
    public async getReportAsync(@Body() body: any, @Param('template') template: any): Promise<any> {
        return await this.reportService.getReportAsync(body, template);
    }

    @HttpCode(201)
    @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    @Header('Content-Disposition', 'attachment; filename=report.xlsx')
    @Get('download-report/:fileName')
    public async downloadReportAsync(@Res() res:any, @Param('fileName') fileName: any): Promise<any> {
        return res.download(path.join(__dirname, '../../../../output', `${fileName}`));
    }

}
