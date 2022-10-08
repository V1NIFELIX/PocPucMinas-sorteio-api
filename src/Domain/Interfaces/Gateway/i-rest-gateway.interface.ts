export interface IRestGateway {
    Get(url: string): Promise<any>,
    Post(url: string, object: any): Promise<any>,
    Put(url: string, object: any): Promise<any>,
    Delete(url: string, object: any): Promise<any>
}