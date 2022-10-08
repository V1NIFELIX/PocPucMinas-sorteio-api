import { Voucher } from '../../Models/Voucher';

export interface IVoucherService {
    getVouchers(aprovacaoPendente?: boolean): Promise<any>
    getVouchersNaoSorteados(data_inicial, data_final, num_loteria): Promise<any>
    getVoucherByChaveAcesso(chave: any): Promise<any>
    getVoucherWithUser(codigo: any): Promise<any>
    getVoucherByID(id): Promise<any>
    addVoucher(voucher: Omit<Voucher, 'ID'>): Promise<any>
    updateVoucher(voucher: Voucher, codigo: any, cartaCompromisso?:string, reciboEntregaPremio?: string): Promise<any>
    aprovarRetiradaDePremio(codigo: string, aprovacao_pendente: boolean): Promise<any>
    delVoucher(id: any): Promise<any>
    getVoucherByCodigo(codigo: any)
    gerarVoucherValido(length: number): Promise<any>
}