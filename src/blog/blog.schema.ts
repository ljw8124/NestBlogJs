// RDB 에서 table 역할

import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";

// 블로크 타입이면서 몽고디비의 도큐먼트로 사용할 수 있는 타입
export type BlogDocument = Blog & Document; //& 를 씀으로서 교차타입으로 생성

// 스키마임을 나타냄
@Schema({versionKey: false})
export class Blog {
    // id 값은 MongoDB 가 만들어줌..
    // 그러므로 따로 프로퍼티로 만들어낼 필요가 없음

    // 스키마의 프로퍼티임을 나타냄, @Prop({required: true}) 와 같이 옵션을 추가할 수 있음
    @Prop()
    @IsNotEmpty()
    @IsNumber()
    readonly postNo: number;

    @Prop()
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @Prop()
    @IsNotEmpty()
    @IsString()
    readonly content: string;

    @Prop()
    @IsNotEmpty()
    @IsString()
    readonly author: string;

    @Prop({ default: new Date() })
    @IsNotEmpty()
    @IsDate()
    readonly createdDt: Date;

    @Prop()
    @IsDate()
    readonly updatedDt: Date;
}

// Blog 를 기반으로 스키마 생성
export const BlogSchema = SchemaFactory.createForClass(Blog);