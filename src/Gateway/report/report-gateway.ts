import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as XlsxTemplate from 'xlsx-injector';
import * as Excel from 'exceljs';
import { IReportGateway } from 'src/Domain/Interfaces/Gateway/i-report-gateway.interface';

@Injectable()
export class ReportGateway implements IReportGateway {
  public async getReportClientAsync(
    data: any,
    template_name: any,
    groupBy: string,
  ): Promise<any> {
    const fileName = `${new Date().getTime()}.xlsx`;
    try {
      const template = new XlsxTemplate();

      await template.loadFile(
        path.join(__dirname, '../../../../output', `${template_name}.xlsx`),
      );

      await template.sheets.forEach(function (sheet) {
        if (groupBy) {
          return template.substitute(sheet.id, data);
        } else {
          return template.substitute(sheet.id, {
            row: data,
          });
        }
      });

      await template.writeFile(
        path.join(__dirname, '../../../../output', `report-${fileName}`),
      );

      const workbook = new Excel.Workbook();

      await workbook.xlsx
        .readFile(
          path.join(__dirname, '../../../../output', `report-${fileName}`),
        )
        .then(async function () {
          await workbook.xlsx.writeFile(
            path.join(__dirname, '../../../../output', `report-${fileName}`),
          );
        });

      return fileName;
    } catch (error) {
      console.error(
        `Nao foi possivel gerar o report a partir do Template: template-${fileName}. Error: ${JSON.stringify(
          error,
        )}`,
      );
    }
  }
}
