import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDto } from './models/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService){}

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto){
        this.productService.createProduct(createProductDto)
    }

    @Get()
    getAllProduct(){
        return this.productService.getAllProduct()
    }
}
