export interface IReportGateway {
    getReportClientAsync(data: any, template: any ,groupBy:string): Promise<any>
}