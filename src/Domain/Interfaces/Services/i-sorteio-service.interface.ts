import { Sorteio } from "src/Domain/Models/Sorteio";

export interface ISorteioService {
    getSorteios()
    getSorteioByID(id: any)
    addSorteio(sorteio: Sorteio)
    delSorteio(id: any)
    Sorteia(usuario__que_sorteou)
    EnviaEmailSorteio(id_sorteio)
    Sorteados()
}