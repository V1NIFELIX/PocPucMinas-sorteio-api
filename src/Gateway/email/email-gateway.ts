import { Injectable, Inject } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { IEmailGateway } from 'src/Domain/Interfaces/Gateway/i-email-gateway.interface';

@Injectable()
export class EmailGateway implements IEmailGateway {
  public async sendEmailClientAsync(
    _from: string,
    _to: any,
    _subject: string,
    _html: string,
  ): Promise<any> {
    try {
      return new Promise(function (resolve, reject) {
        const smtpConfig = {
          host: process.env.EMAIL_SERVER,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
          port: 587,
          secure: false, // dont use SSL
          tls: { rejectUnauthorized: false },
        };

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport(smtpConfig);

        // setup e-mail data with unicode symbols
        const mailOptions = {
          from: _from, // sender address
          to: _to, // list of receivers
          subject: _subject, // Subject line
          html: _html, // html body,
          // attachments: [
          //     {   // utf-8 string as an attachment
          //         filename: _attachment_filename,
          //         content: _attachment_data
          //     }]
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return reject({ result: 'error', data: error });
          }
          return resolve({ result: 'success', data: 'send' });
        });
      });
    } catch (error) {
      console.error(
        `Nao foi possivel enviar o email para: ${_to}. Error: ${JSON.stringify(
          error,
        )}`,
      );
    }
  }
}
