import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {UserDto} from "../dto/user.model";
import {User} from "./user.schema";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    private PASSWORD_SALT = 10;

    constructor(private userRepository: UserRepository) {}

    async getAllUser() : Promise<UserDto[]> {
        const userDtoArr = await this.userRepository.getAllUser();

        // 삭제 시 진짜 삭제가 아닌 Enable = false 처리라서 필터처리
        return userDtoArr.filter(userDto => userDto.isEnable === 'Y');
    }

    async createUser(userDto: UserDto) : Promise<void> {
        const {id, password} = userDto;

        const user = await this.getUser(id);

        if(user) {
            throw new ConflictException(`${id} is already existed`);
        }

        const newUser: UserDto = {
            ...userDto,
            password: await bcrypt.hash(password, this.PASSWORD_SALT)
        }

        return await this.userRepository.createUser(newUser);
    }

    async getUser(userId: string) : Promise<User> {
        return await this.userRepository.getUser(userId);
    }

    async updateUser(userId: string, userDto: UserDto) : Promise<void> {
        await this.isValidUser(userId);

        const updateUserDto = {
            ...userDto,
            updatedDt: new Date(),
        }

        return await this.userRepository.updateUser(userId, updateUserDto);
    }

    async deleteUser(userId: string, userDto: UserDto) : Promise<void> {
        await this.isValidUser(userId);

        const delUserDto: UserDto = {
            ...userDto,
            isEnable: "N"
        }

        return await this.userRepository.deleteUser(userId, delUserDto);
    }

    async isValidUser(userId: string): Promise<void> {
        const user = await this.getUser(userId);

        if(!user) {
            throw new UnauthorizedException(`${userId} does not exist`);
        }
    }

    async doLogin(userId: string, password: string) : Promise<object> {

        const user = await this.getUser(userId);

        const validPassword = await bcrypt.compare(password, user.password);

        const loginResult = validPassword ?
          {
              result: 'SUCCESS',
              id: user.id,
              name: user.name,
              email: user.email,
              phoneNum: user.phoneNum
          } :
          {
              result: 'FAILURE'
          };

        return loginResult;
    }

}
