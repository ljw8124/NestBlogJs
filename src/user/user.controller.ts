import {Controller, UseGuards} from '@nestjs/common';
import {AuthGuard} from "../auth/auth.guard";
import {UserService} from "./user.service";

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
}
