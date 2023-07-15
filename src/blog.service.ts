import {PostDto} from './blog.model'; // 게시글의 타입정보 임포트

export class BlogService {

    // 게시글 배열 선언
    posts = [];

    // 모든 게시글 가져오기
    getAllPosts() {
        return this.posts;
    }

    // 게시글 작성
    createPost(postDto: PostDto) {

        const id = this.posts.length + 1;

        this.posts.push({
            id: id.toString(),
            ...postDto,
            createDt: new Date()
        });
    }

    getPost(id) {
        // post 들 중에 찾고있는 id 와 같은 post 들을 반환
        const post = this.posts.find(post => {
           return post.id === id;
        });

        console.log(post);

        return post;
    }

    delete(id) {
        const filterPosts = this.posts.filter((post) => post.id !== id);

        this.posts = [...filterPosts];
    }

    updatePost(id, postsDto: PostDto) {
        let updateIndex = this.posts.findIndex((post) => post.id === id);
        const updatePost = {id, ...postsDto, updatedDt: new Date()};

        this.posts[updateIndex] = updatePost;

        return updatePost;
    }


}