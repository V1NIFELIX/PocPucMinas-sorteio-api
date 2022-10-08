export interface IEmailGateway {
    sendEmailClientAsync(from: string, to: any, subject: string, html: string): Promise<any>
}