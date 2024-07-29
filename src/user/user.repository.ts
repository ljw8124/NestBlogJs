import {Injectable} from '@nestjs/common';
import {UserDto} from "../dto/user.model";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./user.schema";

interface UserRepo {
    getAllUser(): Promise<UserDto[]>;
    createUser(userDto: UserDto): Promise<void>;
    getUser(userId: string): Promise<UserDto>;
    updateUser(userId: string, userDto: UserDto): Promise<void>;
    deleteUser(userId: string, userDto: UserDto): Promise<void>;
    doLogin(userId: string, password: string): Promise<UserDto>;
}

@Injectable()
export class UserRepository implements UserRepo{

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async getAllUser(): Promise<UserDto[]> {
        return await this.userModel.find().exec();
    }

    async getUser(userId: string): Promise<User> {
        const filter = {
            id: userId,
            isEnable: 'Y'
        };

        const user = await this.userModel.findOne(filter).exec();

        return user!;
    }

    async createUser(newUser: UserDto): Promise<void> {
        await this.userModel.create(newUser);

    }

    async updateUser(userId: string, userDto: UserDto): Promise<void> {
        const filter = {
            id: userId
        };

        await this.userModel.findOneAndUpdate(filter, userDto);

    }

    // 삭제 대신 해당 사용자 아이디 사용 못하게 수정
    async deleteUser(userId: string, userDto: UserDto): Promise<void> {
        const filter = {
            id: userId
        };

        await this.userModel.findOneAndUpdate(filter, userDto);
    }

    async doLogin(userId: string, password: string): Promise<User> {
        const filter = {
            id: userId,
            password: password,
            isEnable: 'Y'
        };

        const loginUser = await this.userModel.findOne(filter).exec();

        return loginUser!;
    }

}
