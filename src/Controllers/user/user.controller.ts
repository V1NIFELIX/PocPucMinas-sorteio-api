import { Controller, Inject, Post, Body, Param, Header, HttpCode, Get, Res, Delete} from '@nestjs/common';
import path = require('path');
import { IUserService } from 'src/Domain/Interfaces/Services/i-user-service.interface';



@Controller('user')
export class UserController {

    constructor(@Inject('IUserService') private readonly userService: IUserService) { }

    // @Get()
    // public async getUsers(): Promise<any> {
    //     return this.userService.getUsers();
    // }

    @Get(':id')
    public async getUserByID(@Param('id') id: any): Promise<any> {
        return this.userService.getUserByID(id);
    }

    @Get('email/:email')
    public async getUserByEmail(@Param('email') email: any): Promise<any> {
        return this.userService.getUserByEmail(email);
    }

    @Get('update/update')
    public async updateUsersComplemento(){
        this.userService.updateUsersComplemento();
    }

    @Get('bloqueia/:email')
    public async bloqueiaUserByEmail(@Param('email') email: any): Promise<any> {
        return this.userService.bloqueiaUserByEmail(email);
    }

    @Get('bloqueados/get')
    public async bloqueados(): Promise<any> {
        return this.userService.bloqueados();
    }

    @Get('bloqueados/get/:email')
    public async bloqueadosByEmail(@Param('email') email: any): Promise<any> {
        return this.userService.bloqueadoByEmail(email);
    }

    @Post()
    public async addUser(@Body() body: any): Promise<any> {
        return this.userService.addUser(body);
    }

    @Post(':id')
    public async updateUser(@Body() body: any,@Param('id') id: any): Promise<any> {
        return this.userService.updateUser(body,id);
    }

    // @Delete(':id')
    // public async delUser(@Param('id') id: any): Promise<any> {
    //     return this.userService.delUser(id);
    // }
    

}
