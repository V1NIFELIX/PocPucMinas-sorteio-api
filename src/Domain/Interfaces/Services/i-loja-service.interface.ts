export interface ILojaService {
    getLojas(): Promise<any>
    getLojaByID(id): Promise<any>
    addLoja(user: any): Promise<any>
    updateLoja(user: any, id): Promise<any>
    delLoja(id: any): Promise<any>
    getLojaByCNPJ(CNPJ: any): Promise<any>
}