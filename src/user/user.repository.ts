import { Injectable } from '@nestjs/common';
import {UserDto} from "../dto/user.model";

interface UserRepo {
    getAllUser(): Promise<UserDto[]>;
    insertUser(userDto: UserDto): Promise<void>;
    getUser(userId: string): Promise<UserDto>;
    enableUser(userId: string, isEnable: boolean): Promise<void>;
    updateUser(userId: string, userDto: UserDto): Promise<void>;
}

@Injectable()
export class UserRepository {

}
