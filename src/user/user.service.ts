import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {UserDto} from "../dto/user.model";
import {User} from "./user.schema";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async getAllUser() : Promise<UserDto[]> {
        const userDtoArr = await this.userRepository.getAllUser();

        return userDtoArr.filter(userDto => userDto.isEnable);
    }

    async createUser(userDto: UserDto) : Promise<void> {
        const salt = 10;
        const {id, password} = userDto;

        const isExistUser = await this.userRepository.getUser(id);

        if(isExistUser) {
            throw new ConflictException('already exist user');
        }

        const newUser: UserDto = {
            ...userDto,
            password: await bcrypt.hash(password, salt)
        }

        return await this.userRepository.createUser(newUser);
    }

    async getUser(userId: string) : Promise<User> {
        return await this.userRepository.getUser(userId);
    }

    async updateUser(userId: string, userDto: UserDto) : Promise<void> {
        const isExistUser = await this.userRepository.getUser(userId);

        if(!isExistUser) {
            throw new UnauthorizedException(`User with id ${userId} does not exist`);
        }

        const updateUserDto = {
            ...userDto,
            updateDate: new Date(),
        }

        return await this.userRepository.updateUser(userId, updateUserDto);
    }

    async deleteUser(userId: string, userDto: UserDto) : Promise<void> {
        const isExistUser = await this.userRepository.getUser(userId);

        if(!isExistUser) {
            throw new UnauthorizedException(`User with id ${userId} does not exist`);
        }

        const delUserDto = {
            ...userDto,
            isEnable: false
        }

        return await this.userRepository.deleteUser(userId, delUserDto);
    }

}
