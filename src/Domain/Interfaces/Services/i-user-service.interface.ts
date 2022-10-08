import { User } from '../../Models/User';
export interface IUserService {
    getUsers(): Promise<any>
    getUserByID(id): Promise<any>
    getUserByEmail(email): Promise<any>
    addUser(user: User): Promise<any>
    updateUser(user: User, id): Promise<any>
    delUser(id: any): Promise<any>
    updateUsersComplemento(): Promise<any>
    bloqueiaUserByEmail(email): Promise<any>
    bloqueados(): Promise<any>
    bloqueadoByEmail(email): Promise<any>
}