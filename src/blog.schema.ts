// RDB 에서 table 역할

import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

// 블로크 타입이면서 몽고디비의 도튜먼트로 사용할 수 있는 타입
export type BlogDocument = Blog & Document; //& 를 씀으로서 교차타입으로 생성

// 스키마임을 나타냄
@Schema()
export class Blog {
    // 스키마의 프로퍼티임을 나타냄, @Prop({required: true}) 와 같이 옵션을 추가할 수 있음
    @Prop()
    id: string;

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    name: string;

    @Prop()
    createdDt: Date;

    @Prop()
    updatedDt: Date;
}

// Blog 를 기반으로 스키마 생성
export const BlogSchema = SchemaFactory.createForClass(Blog);