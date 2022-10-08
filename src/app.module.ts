import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReportController } from './Controllers/report/report.controller';
import { ReportGateway } from './Gateway/report/report-gateway';
import { MysqlGateway } from './Gateway/mysql/mysql-gateway';
import { EmailGateway } from './Gateway/email/email-gateway';
import { RestGateway } from './Gateway/rest/rest-gateway';
import { UserController } from './Controllers/user/user.controller';
import { CupomController } from './Controllers/cupom/cupom.controller';
import { SorteioController } from './Controllers/sorteio/sorteio.controller';
import { ReportService } from './Domain/Services/report/report.service';
import { EmailService } from './Domain/Services/email/email.service';
import { UserService } from './Domain/Services/user/user.service';
import { CupomService } from './Domain/Services/cupom/cupom.service';
import { SorteioService } from './Domain/Services/sorteio/sorteio.service';
import { EmailController } from './Controllers/email/email.controller';
import { LojaService } from './Domain/Services/loja/loja.service';
import { LojaController } from './Controllers/loja/loja.controller';
import { VoucherService } from './Domain/Services/voucher/voucher.service';
import { VoucherController } from './Controllers/voucher/voucher.controller';
import { LoteriaService } from './Domain/Services/loteria/loteria.service';
import { TemplateEmail } from './Domain/templates/TemplateEmail';
import { AnalyticsService } from './Domain/Services/analytics/analytics.service';
import { AnalyticsController } from './Controllers/analytics/analytics.controller';
import { RetiradaService } from './Domain/Services/retirada/retirada.service';
import { RetiradaController } from './Controllers/retirada/retirada.controller';
import { ProdutoService } from './Domain/Services/produto/produto.service';
import { MulterModule } from '@nestjs/platform-express';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { PuppeteerModule } from 'nest-puppeteer';
import { LoteriaController } from './Controllers/loteria/loteria.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SendGridModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        apikey: configService.get<string>('SENDGRID_API_KEY'),
      }),
      inject: [ConfigService],
    }),
    HttpModule,
    ConfigModule.forRoot(),
    MulterModule.register({
      dest: './comprovantes',
    }),
    PuppeteerModule.forRoot(),
  ],
  controllers: [
    RetiradaController,
    ReportController,
    UserController,
    CupomController,
    SorteioController,
    EmailController,
    LojaController,
    VoucherController,
    AnalyticsController,
    LoteriaController,
  ],
  providers: [
    { provide: 'IReportService', useClass: ReportService },
    { provide: 'IReportGateway', useClass: ReportGateway },
    { provide: 'IMysqlGateway', useClass: MysqlGateway },
    { provide: 'IEmailGateway', useClass: EmailGateway },
    { provide: 'IEmailService', useClass: EmailService },
    { provide: 'IRestGateway', useClass: RestGateway },
    { provide: 'IUserService', useClass: UserService },
    { provide: 'ICupomService', useClass: CupomService },
    { provide: 'ISorteioService', useClass: SorteioService },
    { provide: 'ILojaService', useClass: LojaService },
    { provide: 'IVoucherService', useClass: VoucherService },
    { provide: 'ILoteriaService', useClass: LoteriaService },
    { provide: 'ITemplateEmail', useClass: TemplateEmail },
    { provide: 'IAnalyticsService', useClass: AnalyticsService },
    { provide: 'IRetiradaService', useClass: RetiradaService },
    { provide: 'IProdutoService', useClass: ProdutoService },
  ],
})
export class AppModule {}
