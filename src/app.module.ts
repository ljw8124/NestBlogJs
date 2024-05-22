import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog, BlogSchema } from "./blog.schema";
import { /*BlogFileRepository,*/ BlogMongoRepository } from "./blog.repository";

require('dotenv').config();


@Module({
  imports: [
      MongooseModule.forRoot(
          // 해당 값이 null 또는 undefined가 아님을 TypeScript 컴파일러에게 명시적으로 알려주는 것이 '!' 이다.
          // 하지만 이 값이 실제로 null/undefined 인 경우 런타임에서 에러가 나올 수 있으므로 주의해야한다..
          process.env.DB_URI!
      ),
      // 몽고디비 스키마 설정
      MongooseModule.forFeature([{name: Blog.name, schema: BlogSchema}]),
  ],
  controllers: [BlogController],
  providers: [BlogService, /*BlogFileRepository,*/ BlogMongoRepository],
})
export class AppModule {}
