import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Blog, BlogDocument} from "./blog.schema";

// 블로그의 영속성 계층을 위한 코드
import {readFile, writeFile} from "fs/promises";
import {PostDto} from "./blog.model";
import {Injectable} from "@nestjs/common";
// 프레임워크에서 객체를 생성하기 위한 의존성 주입
// 의존성 주입을 통해서 다른 클래스에 주입해 사용하는 클래스들을 프로바이더라고 부른다.

// 블로그 리포지토리 인터페이스 정의
export interface BlogRepository {
    getAllPost(): Promise<PostDto[]>;
    createPost(postDto: PostDto);
    getPost(id: String): Promise<PostDto>;
    deletePost(id: String);
    updatePost(id: String, postDto: PostDto);
}

@Injectable()
export class BlogFileRepository implements BlogRepository {
    FILE_NAME = './src/blog.data.json';

    // 파일을 읽어서 모든 게시글 불러오기
    async getAllPost(): Promise<PostDto[]> {
        const data = await readFile(this.FILE_NAME, 'utf-8');
        const posts = JSON.parse(data);

        return posts;
    }

    // 게시글 쓰기
    async createPost(postDto: PostDto) {
        const posts = await this.getAllPost();

        const id = posts.length + 1;
        const createPost = {id: id.toString(), ... postDto, createdDt: new Date()};
        posts.push(createPost);

        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }

    // 게시글 하나 가져오기
    async getPost(id: string): Promise<PostDto> {
        const posts = await this.getAllPost();
        const result = posts.find((post) => post.id === id);

        return result;
    }

    // 게시글 삭제 -> 파라미터로 받은 아이디와 다른 게시글들만 배열로 만들어서 새로 넣음
    async deletePost(id: string) {
        const posts = await this.getAllPost();
        const filteredPosts = posts.filter((post) => post.id !== id);

        await writeFile(this.FILE_NAME, JSON.stringify(filteredPosts));
    }

    // 게시글 수정하지
    async updatePost(id: String, postDto: PostDto) {
        const posts = await this.getAllPost();
        const index = posts.findIndex((post) => post.id === id);
        const updatePost = {id, ...postDto, updatedDt: new Date()};

        posts[index] = updatePost;

        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }

}

// 몽고디비용 리포지토리
@Injectable()
export class BlogMongoRepository implements BlogRepository {
    // Model<BlogDocument> 타입인 blogModel 주입
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) { }

    async getAllPost(): Promise<Blog[]> {
        return await this.blogModel.find().exec();
    }

    async createPost(postDto: PostDto) {
        const createPost = {
            ...postDto,
            createdDt: new Date(),
            updatedDt: new Date(),
        };

        await this.blogModel.create(createPost);
    }

    async getPost(id: string): Promise<PostDto> {
        return await this.blogModel.findById(id);
    }

    async deletePost(id: string) {
        await this.blogModel.findByIdAndDelete(id);
    }

    async updatePost(id: string, postDto: PostDto) {
        const updatePost = { id, ...postDto, updatedDt: new Date() };
        await this.blogModel.findByIdAndUpdate(updatePost);
    }

}