export interface IReportService {
    getReportAsync(data: any, template: string): Promise<any>,  
    enviaEmail(CONTEUDO_EMAIL,TITULO_EMAIL,emails)

}