import { Cupom } from "src/Domain/Models/Cupom";

export interface ICupomService {
    getCupons()
    getCupomByID(id: any)
    getCupomByUser(email: any)
    getCupomByChave(chave: any)
    addCupom(cupom: Cupom)
    delCupom(id: any)
    checkCupom(message: any)
}