import {PostDto} from './blog.model'; // 게시글의 타입정보 임포트

// service 는 중간 매개 역할만 하게됨
// 리포지토리 임포트
import {BlogFileRepository, BlogRepository} from "./blog.repository";

export class BlogService {

    // 게시글 배열 선언
    // posts = [];
    blogRepository: BlogRepository;

    constructor() {
        this.blogRepository = new BlogFileRepository();
    }

    // 모든 게시글 가져오기
    async getAllPosts() {
        // return this.posts;
        return await this.blogRepository.getAllPost();
    }

    // 게시글 작성
    createPost(postDto: PostDto) {

        // const id = this.posts.length + 1;

        // this.posts.push({
        //     id: id.toString(),
        //     ...postDto,
        //     createDt: new Date()
        // });
        this.blogRepository.createPost(postDto);

    }

    async getPost(id) {
        // post 들 중에 찾고있는 id 와 같은 post 들을 반환
        // const post = this.posts.find(post => {
        //    return post.id === id;
        // });
        //
        // console.log(post);
        //
        // return post;
        return await this.blogRepository.getPost(id);
    }

    delete(id) {
        // const filterPosts = this.posts.filter((post) => post.id !== id);
        //
        // this.posts = [...filterPosts];
        this.blogRepository.deletePost(id);
    }

    updatePost(id, postsDto: PostDto) {
        // let updateIndex = this.posts.findIndex((post) => post.id === id);
        // const updatePost = {id, ...postsDto, updatedDt: new Date()};
        //
        // this.posts[updateIndex] = updatePost;
        //
        // return updatePost;
        this.blogRepository.updatePost(id, postsDto);
    }


}