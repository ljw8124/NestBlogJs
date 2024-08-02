import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UserDto} from "../dto/user.model";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
    ) {}

    // Access Token 발급
    getAccessToken(userDto: UserDto): String {
        const payload = { username: userDto.name, sub: userDto.id };
        const options = { secret: 'TODO: 추가필요..'};

        return this.jwtService.sign(payload, options);
    }

}
