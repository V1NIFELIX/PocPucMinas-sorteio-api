import { Injectable, Inject } from '@nestjs/common';
import { InjectContext } from 'nest-puppeteer';
import { BrowserContext } from 'puppeteer';
import { IRestGateway } from 'src/Domain/Interfaces/Gateway/i-rest-gateway.interface';
import { ILoteriaService } from 'src/Domain/Interfaces/Services/i-loteria-service.interface';

@Injectable()
export class LoteriaService implements ILoteriaService {
  constructor(
    @Inject('IRestGateway') private readonly restGateway: IRestGateway,
    @InjectContext() private readonly browserContext: BrowserContext,
  ) {}

  public async getResult(): Promise<any> {
    try {
      const url = `https://noticias.uol.com.br/loterias/loteria-federal/`;
      const page = await this.browserContext.newPage();

      await page.goto(url, {
        timeout: 60000,
        waitUntil: 'networkidle2',
      });
      const tabela = await page.evaluate(() =>
        Array.from(document.querySelectorAll('tbody > tr'), (row) =>
          Array.from(
            row.querySelectorAll('th, td'),
            (cell: HTMLElement) => cell.innerText,
          ),
        ),
      );
      const concursoElemento = await page.evaluate(() =>
        Array.from(
          document.getElementsByClassName('lottery-info'),
          (e: HTMLElement) => e.innerText,
        ),
      );

      const concurso = concursoElemento[0].split(' ');

      const arraySorteio = [];
      for (let index = 0; index < tabela.length; index++) {
        arraySorteio.push(tabela[index][1]);
      }

      const valorSorteio = [];
      for (let index = 0; index < 5; index++) {
        const premio = arraySorteio[index];
        if (index == 0) {
          valorSorteio.push(premio.substr(-2));
        } else {
          valorSorteio.push(premio.substr(-1));
        }
      }

      await page.close();

      return {
        concurso: concurso[1],
        dataSorteio: concurso[4],
        valorSorteio: valorSorteio.join(''),
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
