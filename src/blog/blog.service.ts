import {PostDto} from '../dto/blog.model'; // 게시글의 타입정보 임포트
import {Injectable} from "@nestjs/common";

// service 는 중간 매개 역할만 하게됨
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
            createdDt: new Date(),
            updatedDt: new Date(),
        };

        await this.blogRepository.createPost(createPost);

    }

    async getPost(postId: string) {

        return await this.blogRepository.getPost(postId);
    }

    async delete(postId: string): Promise<void> {

        await this.blogRepository.deletePost(postId);
    }

    async updatePost(postId: string, postDto: PostDto): Promise<void> {

        const updatePost = { ...postDto, updatedDt: new Date() };

        await this.blogRepository.updatePost(postId, updatePost);
    }


}