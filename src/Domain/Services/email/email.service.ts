import { Injectable, Inject } from '@nestjs/common';
import { IEmailService } from 'src/Domain/Interfaces/Services/i-email-service.interface';
import { ITemplateEmail } from 'src/Domain/templates/ITemplateEmail';
import { SendGridService } from "@anchan828/nest-sendgrid";

@Injectable()
export class EmailService implements IEmailService {

    constructor(@Inject('ITemplateEmail') private readonly templateEmail: ITemplateEmail, private readonly sendGrid: SendGridService) { }

    public async sendEmailErro(_to: any, message: any): Promise<any> {
        try {
            var _from = "sorteio@redemultimarket.com.br";
            const _html = this.templateEmail.generateTemplateError(message);
            return await this.sendGrid.send({ from: _from, to: _to, subject: "Nota Inelegível", html: _html });
        } catch (error) {
            console.error(`Nao foi possivel enviar o email. Erro: ${error}`)
        }
    }

    public async sendEmailClientAsync(_from: string, _to: any, _subject: string, _html: string): Promise<any> {
        try {
            return await this.sendGrid.send({ to: _to, from: _from, subject: _subject, html: _html });
        } catch (error) {
            console.error(`Nao foi possivel enviar o email. Error: ${JSON.stringify(error)}`)
        }
    }

    public async sendEmailVencedor(_to: any, code_nota, nome_nota, cpf_nota, valor_nota, voucher): Promise<any> {
        try {
            var _from = "sorteio@redemultimarket.com.br";
            var _subject = "Resultado do Sorteio Multi Market R$ 600 em vale-compras todo dia";
            let _html = this.templateEmail.generateTemplateEmailVencedor(this.truncateString(code_nota, 30), nome_nota, cpf_nota, valor_nota, voucher);
            _to = _to.split(',')
            _to.forEach(async email => {
                await this.sendGrid.send({ from: _from, to: email, subject: _subject, html: _html });
            });
            return;
        } catch (error) {
            console.error(`Nao foi possivel enviar o email. Error: ${JSON.stringify(error)}`)
        }
    }

    public async sendEmailNumerosSorteio(_to: any, numeros: any): Promise<any> {
        try {
            var _from = "sorteio@redemultimarket.com.br";
            var _subject = "Multi Market R$ 600 em vale-compras todo dia";
            let _html = this.templateEmail.generateTemplateNumerosSorteio(numeros)

            return await this.sendGrid.send({ from: _from, to: _to, subject: _subject, html: _html });
        } catch (error) {
            console.error(`Nao foi possivel enviar o email. Error: ${JSON.stringify(error)}`)
        }
    }

    public async sendEmailLojaSorteio(_to: any, code_nota, nome_nota, cpf_nota, valor_nota, voucher): Promise<any> {
        try {
            var _from = "sorteio@redemultimarket.com.br";
            var _subject = "Multi Market R$ 600 em vale-compras todo dia";
            let _html = this.templateEmail.generateTemplateLojaSorteadaSorteio(this.truncateString(code_nota, 30), nome_nota, cpf_nota, valor_nota, voucher)
            _to = _to.split(',');
            _to.forEach(async email => {
                await this.sendGrid.send({ from: _from, to: email, subject: _subject, html: _html });
            });
            return;
        } catch (error) {
            console.error(`Nao foi possivel enviar o email. Error: ${JSON.stringify(error)}`)
        }
    }

    truncateString(str, num) {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    }

}
