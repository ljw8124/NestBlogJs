
export interface UserDto {
    id: string,
    password: string,
    name: string,
    regDate: Date;

    email?: string,
    phoneNum?: string,

    isEnable: boolean

}