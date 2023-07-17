import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog, BlogSchema } from "./blog.schema";
import { BlogFileRepository, BlogMongoRepository } from "./blog.repository";

require('dotenv').config();

@Module({
  imports: [
      MongooseModule.forRoot(
          process.env.DB_URI + '/blog'
      ),

      // 몽고디비 스키마 설정
      MongooseModule.forFeature([{name: Blog.name, schema: BlogSchema}]),
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogFileRepository, BlogMongoRepository],
})
export class AppModule {}
