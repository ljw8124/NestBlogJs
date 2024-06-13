import {Injectable} from '@nestjs/common';
import {UserDto} from "../dto/user.model";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./user.schema";

interface UserRepo {
    getAllUser(): Promise<UserDto[]>;
    createUser(userDto: UserDto): Promise<void>;
    getUser(userId: string): Promise<UserDto>;
    updateUser(userDto: UserDto): Promise<void>;
    deleteUser(userDto: UserDto): Promise<void>;
}

@Injectable()
export class UserRepository implements UserRepo{

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async getAllUser(): Promise<UserDto[]> {
        return await this.userModel.find().exec();
    }

    async getUser(userId: string): Promise<User> {
        const user = await this.userModel.findById(userId).exec();

        return user!;
    }

    async createUser(newUser: UserDto): Promise<void> {
        await this.userModel.create(newUser);

    }

    async updateUser(userDto: UserDto): Promise<void> {
        await this.userModel.findByIdAndUpdate(userDto.id, userDto);
    }

    // 삭제 대신 해당 사용자 아이디 사용 못하게 수정
    async deleteUser(userDto: UserDto): Promise<void> {
        const userId = userDto.id;

        await this.userModel.findByIdAndUpdate(userId, userDto);
    }

}
