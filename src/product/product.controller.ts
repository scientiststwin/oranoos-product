import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Result } from 'src/shared/main.helper';
import { CreateProductDto } from './models/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService){}

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto): Promise<Result>{
        return this.productService.createProduct(createProductDto)
    }

    @Get()
    getAllProduct(@Query('count') count: number, @Query('page') page: number){
        return this.productService.getAllProduct(page,count)
    }
}
