import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
import { Blog, BlogSchema } from "./blog/blog.schema";
import { /*BlogFileRepository,*/ BlogMongoRepository } from "./blog/blog.repository";
import {config} from "./app.config";

@Module({
  imports: [
      MongooseModule.forRoot(
          config.db.uri
      ),
      // 몽고디비 스키마 설정
      MongooseModule.forFeature([{name: Blog.name, schema: BlogSchema}]),
  ],
  controllers: [BlogController],
  providers: [BlogService, /*BlogFileRepository,*/ BlogMongoRepository],
})
export class AppModule {}
