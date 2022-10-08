import { Controller, Inject, Post, Body, Param, Header, HttpCode, Get, Res} from '@nestjs/common';
import path = require('path');
import { IEmailService } from 'src/Domain/Interfaces/Services/i-email-service.interface';



@Controller('email')
export class EmailController {

    constructor(@Inject('IEmailService') private readonly emailService: IEmailService) { }

    @Post('send-email')
    public async sendEmail(@Body() body: any): Promise<any> {
        return this.emailService.sendEmailClientAsync("auroraconsultingbr@gmail.com",body.to,body.subject,body.html);
    }

    @Post('send-email-vencedor')
    public async sendEmailVencedor(@Body() body: any): Promise<any> {
        return this.emailService.sendEmailVencedor(body.to, body.code_nota, body.nome_nota, body.cpf_nota, body.valor_nota, body.voucher);
    }

    @Post('send-email-numeros')
    public async sendEmailNumeros(@Body() body: any): Promise<any> {
        return this.emailService.sendEmailNumerosSorteio(body.to, body.numeros);
    }

    @Post('send-email-loja')
    public async sendEmailLojaSorteio(@Body() body: any): Promise<any> {
        return this.emailService.sendEmailLojaSorteio(body.to, body.code_nota, body.nome_nota, body.cpf_nota, body.valor_nota, body.voucher);
    }

}
