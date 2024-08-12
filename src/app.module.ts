import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
import { Blog, BlogSchema } from "./blog/blog.schema";
import { BlogRepository } from "./blog/blog.repository";
import {config} from "./app.config";
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import {User, UserSchema} from "./user/user.schema";
import {UserRepository} from "./user/user.repository";
import { AuthService } from './auth/auth.service';

const DB_ADDRESS = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

@Module({
  imports: [
      MongooseModule.forRoot(
          DB_ADDRESS
      ),
      // 몽고디비 스키마 설정
      MongooseModule.forFeature([
          {name: Blog.name, schema: BlogSchema},
          {name: User.name, schema: UserSchema},
      ]),
  ],
  controllers: [
      BlogController, UserController
  ],
  providers: [
      BlogService, BlogRepository,
      UserService, UserRepository,
      // AuthService,
  ],
})
export class AppModule {}
