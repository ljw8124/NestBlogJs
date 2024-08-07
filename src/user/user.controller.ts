import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {AuthGuard} from "../auth/auth.guard";
import {UserService} from "./user.service";
import {UserDto} from "../dto/user.model";

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async getAllUser() : Promise<UserDto[]> {
        return await this.userService.getAllUser();
    }

    @Post()
    async createUser(@Body() userInfo: UserDto) : Promise<void> {
        console.log(`Create User ${userInfo.id}`);

        await this.userService.createUser(userInfo);
    }

    @Get('/:userId')
    async getUser(@Param('userId') userId: string) : Promise<UserDto> {
        const user = await this.userService.getUser(userId);

        console.log(`Get UserInfo => ${user}`);

        return user;
    }

    @Put('/:userId')
    async updateUser(@Param('userId') userId: string, @Body() userInfo: UserDto) : Promise<void> {
        console.log(`Update User ${userId}`);

        await this.userService.updateUser(userId, userInfo);
    }

    @Delete('/:userId')
    async deleteUser(@Param('userId') userId: string, @Body() userInfo: UserDto) : Promise<void> {
        console.log(`Delete(Unable) User ${userId}`);

        await this.userService.deleteUser(userId, userInfo);
    }

    @Post('/login')
    async doLogin(@Body() userId: string, password: string ) : Promise<Object> {
        const loginResult = await this.userService.doLogin(userId, password);

        console.log(loginResult);

        return loginResult;
    }
}
