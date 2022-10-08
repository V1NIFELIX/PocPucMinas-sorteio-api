import { Voucher } from "./Voucher";

export class Sorteio {
    ID: string;
    dt_cadastro: any;
    voucher: string;
    usuario_que_fez_o_sorteio: string;
    numeros_loteria: string;
    concurso: string;
    listaVoucher: Voucher[];
    email_enviado: boolean;
  }
  