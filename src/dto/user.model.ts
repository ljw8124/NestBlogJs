
export interface UserDto {
    id: string,
    password: string,
    name: string,
    createdDt: Date;
    upDatedDt?: Date;
    email?: string,
    phoneNum?: string,

    isEnable: boolean

}