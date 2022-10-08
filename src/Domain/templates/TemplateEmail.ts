import { Injectable } from '@nestjs/common';
import { ITemplateEmail } from './ITemplateEmail';

@Injectable()
export class TemplateEmail implements ITemplateEmail {
  generateTemplateError(message: any) {
    let template = `<!DOCTYPE html>
    <html>

<head>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <title></title>
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <style type="text/css">
      body,
      table,
      td,
      a {
         -webkit-text-size-adjust: 100%;
         -ms-text-size-adjust: 100%;
      }

      table,
      td {
         mso-table-lspace: 0pt;
         mso-table-rspace: 0pt;
      }

      img {
         -ms-interpolation-mode: bicubic;
      }

      img {
         border: 0;
         height: auto;
         line-height: 100%;
         outline: none;
         text-decoration: none;
      }

      table {
         border-collapse: collapse !important;
      }

      body {
         height: 100% !important;
         margin: 0 !important;
         padding: 0 !important;
         width: 100% !important;
      }

      a[x-apple-data-detectors] {
         color: inherit !important;
         text-decoration: none !important;
         font-size: inherit !important;
         font-family: inherit !important;
         font-weight: inherit !important;
         line-height: inherit !important;
      }

      @media screen and (max-width: 480px) {
         .mobile-hide {
            display: none !important;
         }

         .mobile-center {
            text-align: center !important;
         }
      }

      div[style*="margin: 16px 0;"] {
         margin: 0 !important;
      }
   </style>
</head>

<body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
   <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tbody>
         <tr>
            <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
               <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                  <tbody>
                     <tr>
                        <td align="center" valign="top" style="font-size:0;>
                           <div style=" display:inline-block;="" min-width:100px;="" vertical-align:top;"="">
                           <table align="left" border="0" cellpadding="0" cellspacing="0">
                              <tbody>
                                 <tr>
                                    <td align="center"
                                       style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; ">
                                       <img src="https://i.imgur.com/Y14gQCM.png" style="height: px;width:300px;">
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                           <div
                              style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;"
                              class="mobile-hide"></div>
                        </td>
                     </tr>
                     <tr>
                        <td align="center" style="padding: 16px; background-color: #ffffff;" bgcolor="#ffffff">
                           <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                              style="max-width:600px;">
                              <tbody>
                                 <tr>
                                    <td align="center"
                                       style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; ">
                                    </td>
                                 </tr>
                                 <tr>
                                    <td align="left"
                                       style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                       <p
                                          style="color:#5462d5;font-size: 20px; font-weight: 700; line-height: 24px;text-align: center;">
                                          <b>Nota inelegível</b>
                                       </p>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td align="left" style="padding-top: 20px;">
                                       <p
                                          style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;text-align: center;">
                                       <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                          <tbody>
                                             <tr>
                                                <td width="75%" align="center"
                                                   style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                   ${message} </td>
                                             </tr>
                                          </tbody>
                                       </table>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </td>
                     </tr>
                                  <tr>
                  <td align="center" style="background-color: #990000;font-family: Open Sans, Helvetica, Arial, sans-serif;">
                    <h2 style="font-size: 14px; font-weight: 800; line-height: 20px;padding: 15px 0; color: #ffffff; margin: 0;"> Siga nossas redes sociais<br>para mais novidades e ofertas!</h2>
                     <table cellpadding="0" cellspacing="0" width="100%">
                       <tbody><tr>
                      <td align="center">
                        <table cellpadding="0" cellspacing="0">
                          <tbody><tr>
                            <td>
                              <a href="https://www.facebook.com/RedeMultiMarket/" target="_blank">
                                <img src="https://i.imgur.com/A65xNUR.png" alt="Facebook" width="50" height="50" style="display: block;" border="1">
                              </a>
                            </td>
                            <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                            <td>
                              <a href="https://www.youtube.com/channel/UCkFXX2ukAMu44c2GyicUMXA" target="_blank">
                                <img src="https://i.imgur.com/tIhW1Ae.png" alt="Youtube" width="50" height="50" style="display: block;" border="1">
                              </a>
                            </td>
                            <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                            <td>
                              <a href="https://twitter.com/Multimarket_RJ" target="_blank">
                                <img src="https://i.imgur.com/3UtnZbJ.png" alt="Twitter" width="50" height="50" style="display: block;" border="1">
                              </a>
                            </td>
                            <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                            <td>
                              <a href="https://www.instagram.com/redemultimarket.oficial/?hl=pt-br" target="_blank">
                                <img src="https://i.imgur.com/hPK880Y.png" alt="Instagram" width="50" height="50" style="display: block;" border="1">
                              </a>
                            </td>
                          </tr>
                        </tbody></table>
                        <br>
                    <br>
                  </td>
                </tr>
                              </tbody>
                           </table>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </td>
         </tr>
      </tbody>
   </table>
</body>

</html>`;
    return template;
  }

  generateTemplateEmailVencedor(
    code_nota,
    nome_nota,
    cpf_nota,
    valor_nota,
    voucher,
  ) {
    let template = `<!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <style type="text/css">
          body,
          table,
          td,
          a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
    
          table,
          td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
    
          img {
            -ms-interpolation-mode: bicubic;
          }
    
          img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
          }
    
          table {
            border-collapse: collapse !important;
          }
    
          body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }
    
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
          }
    
          @media screen and (max-width: 480px) {
            .mobile-hide {
              display: none !important;
            }
    
            .mobile-center {
              text-align: center !important;
            }
          }
    
          div[style*="margin: 16px 0;"] {
            margin: 0 !important;
          }
        </style>
      </head>
      <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr>
              <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                  <tbody>
                    <tr>
                      <td align="center" valign="top" style="font-size:0;>
                              <div style=" display:inline-block;="" min-width:100px;="" vertical-align:top;"="">
                        <table align="left" border="0" cellpadding="0" cellspacing="0">
                          <tbody>
                            <tr>
                              <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; ">
                                <img src="https://i.imgur.com/wou03eA.png" style="height: px;width:300px;">
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide"></div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding: 16px; background-color: #ffffff;" bgcolor="#ffffff">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                          <tbody>
                            <tr>
                              <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; "></td>
                            </tr>
                            <tr>
                              <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                <p style="color:#37322e;font-size: 20px; font-weight: 700; line-height: 24px;text-align: center;">Agora você tem R$600 para fazer suas compras no Multi Market!</p>
                                <div align="center" style="font-weight: 400; line-height: 24px; ">
                                  <img align="center" style="font-weight: 400; line-height: 24px;height:px;width:130px;" src="https://i.imgur.com/bo9uPth.png">
                                </div>
                                <p style="color:#990000;font-size: 16px; font-weight: 600; line-height: 24px;text-align: center;"> A equipe do Multi Market entrará em contato para agendar o melhor dia e horário para a retirada do seu voucher na loja em que sua compra foi feita. </p>
                                <p style="color:#37322e;font-size: 16px; font-weight: 600; line-height: 24px;text-align: center; background:#	#D3D3D3"> Mas, para validar seu cupom, precisamos que você confirme os dados abaixo:. </p>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="padding-top: 20px;">
                                <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;text-align: center;">
                                  <b style="background:#D3D3D3">Seus códigos promocionais</b>
                                  <br>${voucher}
                                </p>
                                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                  <tbody>
                                    <tr></tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="background-color: #990000;font-family: Open Sans, Helvetica, Arial, sans-serif;">
                        <h2 style="font-size: 14px; font-weight: 800; line-height: 20px;padding: 15px 0; color: #ffffff; margin: 0;"> Siga nossas redes sociais <br>para mais novidades e ofertas! </h2>
                        <table cellpadding="0" cellspacing="0" width="100%">
                          <tbody>
                            <tr>
                              <td align="center">
                                <table cellpadding="0" cellspacing="0">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <a href="https://www.facebook.com/RedeMultiMarket/" target="_blank">
                                          <img src="https://i.imgur.com/A65xNUR.png" alt="Facebook" width="50" height="50" style="display: block;" border="1">
                                        </a>
                                      </td>
                                      <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                                      <td>
                                        <a href="https://www.youtube.com/channel/UCkFXX2ukAMu44c2GyicUMXA" target="_blank">
                                          <img src="https://i.imgur.com/tIhW1Ae.png" alt="Youtube" width="50" height="50" style="display: block;" border="1">
                                        </a>
                                      </td>
                                      <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                                      <td>
                                        <a href="https://twitter.com/Multimarket_RJ" target="_blank">
                                          <img src="https://i.imgur.com/3UtnZbJ.png" alt="Twitter" width="50" height="50" style="display: block;" border="1">
                                        </a>
                                      </td>
                                      <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                                      <td>
                                        <a href="https://www.instagram.com/redemultimarket.oficial/?hl=pt-br" target="_blank">
                                          <img src="https://i.imgur.com/hPK880Y.png" alt="Instagram" width="50" height="50" style="display: block;" border="1">
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <br>
                                <br>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>`;

    return template;
  }

  generateTemplateLojaSorteadaSorteio(
    code_nota,
    nome_nota,
    cpf_nota,
    valor_nota,
    voucher,
  ) {
    let template = `<!DOCTYPE html>
    <html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title></title>
    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style type="text/css">
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }

      img {
        -ms-interpolation-mode: bicubic;
      }

      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
      }

      table {
        border-collapse: collapse !important;
      }

      body {
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      @media screen and (max-width: 480px) {
        .mobile-hide {
          display: none !important;
        }

        .mobile-center {
          text-align: center !important;
        }
      }

      div[style*="margin: 16px 0;"] {
        margin: 0 !important;
      }


    </style>

  </head><body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tbody><tr>
        <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
            <tbody><tr>
              <td align="center" valign="top" style="font-size:0;>
                <div style=" display:inline-block;="" min-width:100px;="" vertical-align:top;"="">
                  <table align="left" border="0" cellpadding="0" cellspacing="0">
                    <tbody><tr>
                        <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; ">
                          <img src="https://i.imgur.com/kVE5RGf.png" style="height: px;width:300px;">
                        </td>
                    </tr>
                  </tbody></table>
                
                <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">

                </div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 16px; background-color: #ffffff;" bgcolor="#ffffff">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                  <!-- <tr>
                    <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"> <br>
                      <h2 style="font-size: 20px; font-weight: 800; line-height: 25px; color: #333333; margin: 0;">
                          Agora você tem R$600 para fazer
                          suas compras no Multi Market! </h2>
                      <img src="https://i.imgur.com/761UPbO.jpg" width="125" height="120" style="display: block; border: 0px;padding-top: 25px;" />
                      <br>
                    </td>
                  </tr> -->
                  <tbody><tr>
                    <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                      <p style="color:#990000;font-size: 16px; font-weight: 600; line-height: 24px;text-align: center;"> 
                          Para resgatar o prêmio, a pessoa sorteada deve apresentar o e-mail de premiado e o cupom fiscal.
                      </p>
                      <p style="color:#990000;font-size: 16px; font-weight: 600; line-height: 24px;text-align: center;">
                       E, ao final do resgate dos R$600 em compras, o gerente da loja deve dar baixa do cupom no site da promoção.
                    </p>
                      <p style="color:#990000;font-size: 16px; font-weight: 600; line-height: 24px;text-align: center;">
                          Ficou com alguma dúvida?
                          Entre em contato pelas redes sociais
                          ou pelo telefone (21) 98843-2744
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" style="padding-top: 20px;">
                      <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;text-align: center;"><b>Código premiado</b><br>${voucher}</p><p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;text-align: center;"><b>Chave de Acesso:</b> <br>${code_nota}</p><p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;text-align: center;"><b>Nome do Sorteado:</b> <br>${nome_nota}</p><p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;text-align: center;"><b>CPF do Sorteado:</b> <br>${cpf_nota}</p><p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;text-align: center;"><b>Valor da Compra:</b> <br>${valor_nota}</p><table cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tbody><tr>
                        
                          
                          
                          
 
                        </tr>
                      </tbody></table>
                    </td>
                  </tr>

                </tbody></table>
              </td>
            </tr>
            <tr>
              <td align="center" style="background-color: #990000;font-family: Open Sans, Helvetica, Arial, sans-serif;">
                <h2 style="font-size: 14px; font-weight: 800; line-height: 20px;padding: 15px 0; color: #ffffff; margin: 0;"> Siga nossas redes sociais<br>para mais novidades e ofertas!</h2>
                 <table cellpadding="0" cellspacing="0" width="100%">
                   <tbody><tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0">
                      <tbody><tr>
                        <td>
                          <a href="https://www.facebook.com/RedeMultiMarket/" target="_blank">
                            <img src="https://i.imgur.com/A65xNUR.png" alt="Facebook" width="50" height="50" style="display: block;" border="1">
                          </a>
                        </td>
                        <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                        <td>
                          <a href="https://www.youtube.com/channel/UCkFXX2ukAMu44c2GyicUMXA" target="_blank">
                            <img src="https://i.imgur.com/tIhW1Ae.png" alt="Youtube" width="50" height="50" style="display: block;" border="1">
                          </a>
                        </td>
                        <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                        <td>
                          <a href="https://twitter.com/Multimarket_RJ" target="_blank">
                            <img src="https://i.imgur.com/3UtnZbJ.png" alt="Twitter" width="50" height="50" style="display: block;" border="1">
                          </a>
                        </td>
                        <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                        <td>
                          <a href="https://www.instagram.com/redemultimarket.oficial/?hl=pt-br" target="_blank">
                            <img src="https://i.imgur.com/hPK880Y.png" alt="Instagram" width="50" height="50" style="display: block;" border="1">
                          </a>
                        </td>
                      </tr>
                    </tbody></table>
                    <br>
                <br>
              </td>
            </tr>
          </tbody></table>
        </td>
      </tr>
    </tbody></table>
  </td></tr></tbody></table></body></html>`;
    return template;
  }

  generateTemplateNumerosSorteio(numeros) {
    let template = `
    <!DOCTYPE html>
    <html>
   <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title></title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <style type="text/css">
         body,
         table,
         td,
         a {
         -webkit-text-size-adjust: 100%;
         -ms-text-size-adjust: 100%;
         }
         table,
         td {
         mso-table-lspace: 0pt;
         mso-table-rspace: 0pt;
         }
         img {
         -ms-interpolation-mode: bicubic;
         }
         img {
         border: 0;
         height: auto;
         line-height: 100%;
         outline: none;
         text-decoration: none;
         }
         table {
         border-collapse: collapse !important;
         }
         body {
         height: 100% !important;
         margin: 0 !important;
         padding: 0 !important;
         width: 100% !important;
         }
         a[x-apple-data-detectors] {
         color: inherit !important;
         text-decoration: none !important;
         font-size: inherit !important;
         font-family: inherit !important;
         font-weight: inherit !important;
         line-height: inherit !important;
         }
         @media screen and (max-width: 480px) {
         .mobile-hide {
         display: none !important;
         }
         .mobile-center {
         text-align: center !important;
         }
         }
         div[style*="margin: 16px 0;"] {
         margin: 0 !important;
         }
      </style>
   </head>
   <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
         <tbody>
            <tr>
               <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                     <tbody>
                        <tr>
                           <td align="center" valign="top" style="font-size:0;>
                           <div style=" display:inline-block;="" min-width:100px;="" vertical-align:top;"="">
                           <table align="left" border="0" cellpadding="0" cellspacing="0">
                              <tbody>
                                 <tr>
                                    <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; ">
                                       <img src="https://i.imgur.com/Y14gQCM.png" style="height: px;width:300px;">
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                           <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide"></div>
                           </td>
                        </tr>
                        <tr>
                           <td align="center" style="padding: 16px; background-color: #ffffff;" bgcolor="#ffffff">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                 <tbody>
                                    <tr>
                                       <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; "></td>
                                    </tr>
                                    <tr>
                                       <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                          <p style="color:#5462d5;font-size: 20px; font-weight: 700; line-height: 24px;text-align: center;">
                                             <b>A sua inscrição foi concluída com sucesso!</b>
                                          </p>
                                          <img src="https://i.imgur.com/OB1qxCo.png" style="height: px;width:90; display: block;   margin-left: auto;  margin-right: auto;  width: 50%;">
                                          <p style="color:#000000;font-size: 16px; font-weight: 600; line-height: 24px;text-align: center;">
                                             <b>Obrigado por participar da nossa promoção. <br> Esses são os seus <br> números da sorte: </b>
                                          </p>
                                       </td>
                                    </tr>
                                    <tr>
                                    <td align="left" style="padding-top: 20px;">
                                       <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;text-align: center;">
                                       <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                          <tbody>
                                             <tr>${numeros}</tr>
                                          </tbody>
                                       </table>
                                    </td>
                                 </tr>
                                 </tbody>
                              </table>
                           </td>
                        </tr>
                        <tr>
                           <td align="center" style="background-color: #b91d22;font-family: Open Sans, Helvetica, Arial, sans-serif;">
                              <h2 style="font-size: 14px; font-weight: 800; line-height: 20px;padding: 15px 0; color: #ffffff; margin: 0;"> Lembrando que entraremos em contato com os sorteados por e-mail, então <br> fique de olho na sua caixa de entrada <br> e na sua caixa de spam. <br> Verifique atentamente todos os dias! <br>
                                 <br> Essa pode ser a sua chance de ganhar <br> R$600 em vale-compras no Multi. <br>
                                 <br>
                                 <b style="color:#f0cd3d";>Boa Sorte!</b>
                              </h2>
                        </tr>
                        <tr>
                           <td align="center" style="background-color: #fffff;font-family: Open Sans, Helvetica, Arial, sans-serif;">
                              <h2 style="font-size: 14px; font-weight: 800; line-height: 20px;padding: 15px 0; color: #b91d22; margin: 0;"> Siga nossas redes sociais <br>para mais novidades e ofertas! </h2>
                              <table cellpadding="0" cellspacing="0" width="100%">
                                 <tbody>
                                    <tr>
                                       <td align="center">
                                          <table cellpadding="0" cellspacing="0">
                                             <tbody>
                                                <tr>
                                                   <td>
                                                      <a href="https://www.facebook.com/RedeMultiMarket/" target="_blank">
                                                      <img src="https://i.imgur.com/HAv66bD.png" alt="Facebook" width="50" height="50" style="display: block;" border="1">
                                                      </a>
                                                   </td>
                                                   <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                                                   <td>
                                                      <a href="https://www.youtube.com/channel/UCkFXX2ukAMu44c2GyicUMXA" target="_blank">
                                                      <img src="https://i.imgur.com/pOiTJQh.png" alt="Youtube" width="50" height="50" style="display: block;" border="1">
                                                      </a>
                                                   </td>
                                                   <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                                                   <td>
                                                      <a href="https://twitter.com/Multimarket_RJ" target="_blank">
                                                      <img src="https://i.imgur.com/61BN0Ua.png alt="Twitter" width="50" height="50" style="display: block;" border="1">
                                                      </a>
                                                   </td>
                                                   <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                                                   <td>
                                                      <a href="https://www.instagram.com/redemultimarket.oficial/?hl=pt-br" target="_blank">
                                                      <img src="https://i.imgur.com/eMFNiHy.png" alt="Instagram" width="50" height="50" style="display: block;" border="1">
                                                      </a>
                                                   </td>
                                                </tr>
                                             </tbody>
                                          </table>
                                          <br>
                                          <br>
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
         </tbody>
      </table>
   </body>
</html>`;

    return template;
  }
}
