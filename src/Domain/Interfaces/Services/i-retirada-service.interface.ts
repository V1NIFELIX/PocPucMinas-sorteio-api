import { Retirada } from "src/Domain/Models/retirada";

export interface IRetiradaService {
    getRetiradas(): Promise<any>
    addRetirada(retirada: Retirada): Promise<any>
}