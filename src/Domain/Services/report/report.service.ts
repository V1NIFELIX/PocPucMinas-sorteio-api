import { Injectable, Inject } from '@nestjs/common';


import * as path from "path"
import * as fs from "fs"
import * as _ from "lodash";
import { IReportService } from 'src/Domain/Interfaces/Services/i-report-service.interface';
import { IReportGateway } from 'src/Domain/Interfaces/Gateway/i-report-gateway.interface';
import { IEmailGateway } from 'src/Domain/Interfaces/Gateway/i-email-gateway.interface';



@Injectable()
export class ReportService implements IReportService {

    constructor(
        @Inject('IReportGateway') private readonly reportGateway: IReportGateway,
        @Inject('IEmailGateway') private readonly emailGateway: IEmailGateway) { }


    public async getReportAsync(data: any, template: string): Promise<any> {
        try {
            let groupBy;
            if (Object.keys(data).some(v => v == 'GroupBy')) {
                groupBy = data.GroupBy;
                data.data = await this.groupBy(data.data, groupBy);
            }
            let template_s3 = await this.readFileAsync(`${template}.xlsx`)
            if (!template_s3)
                return { result: "error", data: "Arquivo não encontrado" };
            let CreateReport = await this.reportGateway.getReportClientAsync(data.data, template, groupBy);
            
            return { result: "success", data: `report-${CreateReport}` };

        } catch (error) {
            console.error(`Nao foi possivel gerar o report. Template: ${template}. Error: ${JSON.stringify(error)}`)
            return { result: "error", data: "Arquivo não encontrado" };
        }
    }

    groupBy = (ARRAY, FILTER) => { return _.groupBy(ARRAY, x => x[FILTER]) };
  
    async WriteTempFileAsync(fileName: string, buffer: any) {
        fs.writeFileSync(path.join(__dirname, '../../../../../output', fileName), buffer, 'binary');
    }

    
    async readFileAsync(fileName: string) {
        return await fs.readFileSync(path.join(__dirname, '../../../../../output', fileName));
    }



    async enviaEmail(CONTEUDO_EMAIL,TITULO_EMAIL,emails) {
         return await this.emailGateway.sendEmailClientAsync("no-reply@redemultimarket.com.br", emails, TITULO_EMAIL, CONTEUDO_EMAIL);
    }

}
