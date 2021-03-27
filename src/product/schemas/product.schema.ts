import { Prop, SchemaFactory, Schema, raw } from "@nestjs/mongoose";
import { date } from "joi";
import { Date, Document } from "mongoose";

class Property{
    @Prop()
    key: string
    
    @Prop()
    value: string
}


export type ProductDocument = Product & Document;
@Schema()
export class Product{
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    description: string

    @Prop({ type: Property })
    property: Property[]

    @Prop({type: Date, default: Date.now})
    created_at: Date

    @Prop({type: Date, default: Date.now })
    updated_at: Date
}

export const ProductSchema = SchemaFactory.createForClass(Product);