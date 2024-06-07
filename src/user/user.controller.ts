import {Body, Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {AuthGuard} from "../auth/auth.guard";
import {UserService} from "./user.service";
import {UserDto} from "../dto/user.model";

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async getAllUser() : Promise<UserDto[]> {
        const allUsers = await this.userService.getAllUser();

        return allUsers;
    }

    @Post()
    async createUser(@Body() userInfo: UserDto) : Promise<void> {
        console.log(`Create User ${userInfo}`);

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

    @Put('/:userId')
    async deleteUser(@Param('userId') userId: string, @Body() userInfo: UserDto) : Promise<void> {
        console.log(`Delete(Unable) User ${userId}`);

        await this.userService.deleteUser(userInfo);
    }
}
