import {Controller, Param, Body, Delete, Get, Post, Put} from "@nestjs/common";
// @Body 는 함수의 body 로 오는 값을 매개변수에 할당하고,
// @Param 은 URL param 의 값을 함수 매개변수에 할당한다.
import {BlogService} from "./blog.service";

// 컨트롤러의 역할은 HTTP 요청을 특정 함수가 실행하는 것이다. -> 실제 로직은 Service 에서 실행
// 클래스에 붙이는 Controller 데코레이터
// Controller('blog') 의 의미는 {서버주소}/blog 라는 의미이다.
@Controller('blog')
export class BlogController {

    // blogService: BlogService;
    // 생성자에서 주입받은 BlogFileRepository 타입의 값을 할당
    constructor(private blogService: BlogService) {
        // NestJS 에서는 의존성 주입을 이용하지만 아직은 생성자를 이용하여 생성 -> 의존성 주입으로 주석처리
        // this.blogService = new BlogService();
    }

    @Get()
    getAllPost() {
        console.log('모든 게시물 가져오기');

        return this.blogService.getAllPosts();
    }

    @Post()
    createPost(@Body() postDto: any) { // HTTP 요청의 body 내용을 post 에 할당
        console.log('게시글 작성');
        console.log('success', postDto);

        this.blogService.createPost(postDto);

        return "success";
    }

    // 서비스에서 비동기처리로 수정했기 때문에 비동기 처리해주어야 함
    @Get('/:id')    // GET 에 URL 매개변수 id 가 있는 요청 처리
    async getPost(@Param('id') id: string) {
        console.log(`[id: ${id}] 게시글 하나 가져오기`);

        const post = await this.blogService.getPost(id);
        console.log(post);

        return post

    }

    @Delete('/:id')
    deletePost(@Param('id') id: string) {
        console.log('게시글 삭제');

        this.blogService.delete(id);

        return 'success';
    }

    @Put('/:id')
    updatePost(@Param('id') id, @Body() postDto: any) {
        console.log(`[${id}] 게시글 업데이트`);
        console.log(postDto);

        return  this.blogService.updatePost(id, postDto);

    }

}