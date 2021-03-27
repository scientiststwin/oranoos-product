import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Result, ResultError, RpcResultError } from 'src/shared/main.helper';
import { CreateProductDto } from './models/product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private ProductModel: Model<ProductDocument>){}

    async createProduct(createProductDto: CreateProductDto): Promise<Result>{
        try{
            const newProduct = new this.ProductModel(createProductDto)        
            const result = await newProduct.save()
            return new Result(result)

        }catch(err){
            throw new ResultError(err?.data)
        }
        
    }

    async getAllProduct(page: number, count: number): Promise<Result>{       
        try{
            const result = await this.ProductModel.find().sort({ created_at: 1 }).skip(+page * +count).limit(+count)          
            return new Result(result)

        }catch(err){            
            throw new ResultError(err?.message)
        }
    }

    productInformation(productId: string){
        return new Promise(async (resolve, reject)=>{
            try{
                const product = await this.ProductModel.findById(productId).exec()

                resolve( new Result(product, {code: 200}) )
            }catch(err){
                reject(new RpcResultError(null,500))
            }
        })
    }

    productsInformation(productIds: string[]){
        return new Promise(async(resolve, reject) => {
            try{
                const products = await this.ProductModel.find({'_id': {'$in': productIds}})
                
                resolve(new Result(products, {code: 200}))
            }catch(err){
                reject(new RpcResultError(null,500))
            }
        })
    }
}
