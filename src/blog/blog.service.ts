import {PostDto} from '../dto/blog.model'; // 게시글의 타입정보 임포트
import { Injectable, UnauthorizedException } from "@nestjs/common";

// service 는 중간 매개 및 데이터 가공을 하게됨
// 리포지토리 임포트
import {BlogRepository} from "./blog.repository";

@Injectable()
export class BlogService {

    // MongoRepository 를 바라보도록 수정
    constructor(private blogRepository: BlogRepository) {}

    // 모든 게시글 가져오기
    async getAllPosts() {
        return await this.blogRepository.getAllPost();
    }

    // 게시글 작성
    async createPost(postDto: PostDto) {
        const posts = await this.blogRepository.getAllPost();
        const prevPostNo = posts.length > 0 ? posts[posts.length - 1].postNo : 0;

        const createPost = {
            ...postDto,
            postNo: prevPostNo + 1,
            updatedDt: new Date(),
        };

        await this.blogRepository.createPost(createPost);

    }

    async getPost(postNo: string) {

        return await this.blogRepository.getPost(postNo);
    }

    async updatePost(postNo: string, postDto: PostDto): Promise<void> {
        await this.isValidPost(postNo);

        const updatePost = { ...postDto, updatedDt: new Date() };

        await this.blogRepository.updatePost(postNo, updatePost);
    }

    async delete(postNo: string): Promise<void> {
        await this.isValidPost(postNo);

        await this.blogRepository.deletePost(postNo);
    }

    async isValidPost(postNo: string): Promise<void> {
        const post = await this.getPost(postNo);

        if(!post) {
            throw new UnauthorizedException(`Post ${postNo} does not exist`);
        }
    }


}