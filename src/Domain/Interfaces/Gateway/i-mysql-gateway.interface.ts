import { ReqResponse } from "src/Domain/Models/ReqResponse";

export interface IMysqlGateway {
    getQueryAsync(query: string, groupBy?: string)
}