import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Blog, BlogDocument} from "./blog.schema";

// 블로그의 영속성 계층을 위한 코드
import {PostDto} from "../dto/blog.model";
import {Injectable, NotFoundException} from "@nestjs/common";
// 프레임워크에서 객체를 생성하기 위한 의존성 주입
// 의존성 주입을 통해서 다른 클래스에 주입해 사용하는 클래스들을 프로바이더라고 부른다.

// 블로그 리포지토리 인터페이스 정의
export interface BlogRepo {
    getAllPost(): Promise<PostDto[]>;
    createPost(postDto: PostDto): Promise<void>;
    getPost(postNo: String): Promise<PostDto>;
    deletePost(postNo: String): Promise<void>;
    updatePost(postNo: String, postDto: PostDto): Promise<void>;
}

// 몽고디비용 리포지토리
@Injectable()
export class BlogRepository implements BlogRepo {
    // Model<BlogDocument> 타입인 blogModel 주입
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) { }

    async getAllPost(): Promise<Blog[]> {
        // exec() 를 붙이든 말든 데이터상으로는 동일하지만,
        // promise 를 온전히 반환함으로써 에러가 났을 때 처리가 용이해진다.
        return await this.blogModel.find().exec();
    }

    async createPost(postDto: PostDto): Promise<void> {
        await this.blogModel.create(postDto);
    }

    async getPost(postNo: string): Promise<Blog> {
        const filterOption = { postNo: postNo };
        const post = await this.blogModel.findOne(filterOption).exec();

        return post!;
    }

    async deletePost(postNo: string) {
        const filterOption = { postNo: postNo };

        await this.blogModel.findOneAndDelete(filterOption);

    }

    async updatePost(postNo: string, postDto: PostDto) {
        const filterOption = { postNo: postNo };

        await this.blogModel.findOneAndUpdate(filterOption, postDto);
    }

}