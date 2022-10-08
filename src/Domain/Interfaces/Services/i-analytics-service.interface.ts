export interface IAnalyticsService {
    getByPeriod(body: any): Promise<any>
    getProductsByPeriod(body: any): Promise<any>
    getVendasByPeriod(body: any): Promise<any>
    getMelhoresClientesByPeriod(body: any): Promise<any> 
    getCadastrosByPeriod(body: any): Promise<any> 
    getComprasByPeriod(body: any): Promise<any>
    getFaixaEtariaByPeriod(body: any): Promise<any>
}