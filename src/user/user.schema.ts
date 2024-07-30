
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {IsBoolean, IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, IsString} from "class-validator";

// 블로크 타입이면서 몽고디비의 도큐먼트로 사용할 수 있는 타입
export type UserDocument = User & Document; //& 를 씀으로서 교차타입으로 생성

@Schema({versionKey: false})
export class User {
    @Prop()
    @IsString()
    @IsNotEmpty()
    readonly id: string;

    @Prop()
    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @Prop()
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @Prop({ default: new Date() })
    @IsDate()
    @IsNotEmpty()
    readonly createdDt: Date;

    @Prop()
    @IsDate()
    readonly updatedDt: Date;

    @Prop()
    @IsEmail()
    readonly email: string;

    @Prop()
    @IsPhoneNumber()
    readonly phoneNum: string;

    @Prop({ default: "Y" })
    readonly isEnable: "Y" | "N";

}

export const UserSchema = SchemaFactory.createForClass(User);