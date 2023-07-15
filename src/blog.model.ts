
export interface PostDto {
    id: string;
    title: string;
    content: string;
    name: string;
    createDt: Date;
    updateDt?: Date;    // ? 는 필수 값이 아니라는 의미, null 이 가능하다. 이 외에는 모두 not null
}