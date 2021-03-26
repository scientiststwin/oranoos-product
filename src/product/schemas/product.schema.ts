import { Prop, raw, SchemaFactory } from "@nestjs/mongoose";
import { string } from "joi";
import { Document } from "mongoose";

// export type ProductDocument = Product & Document;

export class Product extends Document{
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    description: string

    // @Prop([raw({
    //     key: {type: string},
    //     value: {type: string}
    // })])
    // property: Record<string,any>
}

export const ProductSchema = SchemaFactory.createForClass(Product);