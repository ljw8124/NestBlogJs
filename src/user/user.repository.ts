import {Injectable, NotFoundException} from '@nestjs/common';
import {UserDto} from "../dto/user.model";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./user.schema";

interface UserRepo {
    getAllUser(): Promise<UserDto[]>;
    createUser(userDto: UserDto): Promise<void>;
    getUser(userId: string): Promise<UserDto>;
    updateUser(userId: string, userDto: UserDto): Promise<void>;
    enableUser(userDto: UserDto, isEnable: boolean): Promise<void>;
}

@Injectable()
export class UserRepository implements UserRepo{

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async getAllUser(): Promise<UserDto[]> {
        return await this.userModel.find().exec();
    }

    async getUser(userId: string): Promise<User> {
        const user = await this.userModel.findById(userId).exec();

        if(!user) {
            throw new NotFoundException("User not found");
        }

        return user;
    }

    async createUser(userDto: UserDto): Promise<void> {
        const newUser = {
            ...userDto,
            createdDt: new Date(),
        };

        await this.userModel.create(newUser);

    }

    async updateUser(userId: string, userDto: UserDto): Promise<void> {
        await this.userModel.findByIdAndUpdate(userId, userDto);
    }

    // 삭제 대신 해당 사용자 아이디 사용 못하게 수정
    async enableUser(userDto: UserDto, isEnable: boolean): Promise<void> {
        const userId = userDto.id;
        const deleteUserInfo = {
            ...userDto,
            isEnable: isEnable,
        }

        await this.userModel.findByIdAndUpdate()
    }

}
