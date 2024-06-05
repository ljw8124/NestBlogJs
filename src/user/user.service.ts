import { Injectable } from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {UserDto} from "../dto/user.model";
import {User} from "./user.schema";

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async getAllUser() : Promise<UserDto[]> {
        return await this.userRepository.getAllUser();
    }

    async createUser(userDto: UserDto) : Promise<void> {
        return await this.userRepository.createUser(userDto);
    }

    async getUser(userId: string) : Promise<User> {
        return await this.userRepository.getUser(userId);
    }

    async updateUser(userId: string, userDto: UserDto) : Promise<void> {
        return await this.userRepository.updateUser(userId, userDto);
    }

    async deleteUser(userDto: UserDto) : Promise<void> {
        return await this.userRepository.enableUser(userDto);
    }

}
