import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './models/product.dto';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private ProductModel: Model<Product>){}

    async createProduct(createProductDto: CreateProductDto){

        console.log(createProductDto);
        const newProduct = new this.ProductModel()
        newProduct.description = "okokokok"
        console.log(newProduct);
        
        await newProduct.save()
        console.log("OKOK");
        
    }

    async getAllProduct(){
        return this.ProductModel.find().exec()
    }
}
