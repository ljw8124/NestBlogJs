import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {UserDto} from "../dto/user.model";
import {User} from "./user.schema";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async getAllUser() : Promise<UserDto[]> {
        return await this.userRepository.getAllUser();
    }

    async createUser(userDto: UserDto) : Promise<void> {
        const salt = 10;
        const {id, password} = userDto;

        const isExistUser = await this.userRepository.getUser(id);

        if(isExistUser) {
            throw new ConflictException('already exist user');
        }

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser: UserDto = {
            ...userDto,
            password: hashedPassword,
            regDate: new Date(),
            isEnable: true
        }

        return await this.userRepository.createUser(newUser);
    }

    async getUser(userId: string) : Promise<User> {
        return await this.userRepository.getUser(userId);
    }

    async updateUser(userId: string, userDto: UserDto) : Promise<void> {
        return await this.userRepository.updateUser(userId, userDto);
    }

    async deleteUser(userDto: UserDto) : Promise<void> {
        const isExistUser = await this.userRepository.getUser(userDto.id);

        if(!isExistUser) {
            throw new UnauthorizedException(`User with id ${userDto.id} does not exist`);
        }

        const delUser = {
            ...userDto,
            isEnable: false
        }
        return await this.userRepository.deleteUser(delUser);
    }

}
