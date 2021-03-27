import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/auth/jwt.guard';
import { User } from 'src/shared/auth/user.decorator' 
import { Result } from 'src/shared/main.helper';
import { CreateProductDto } from './models/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    createProduct(@User() user,@Body() createProductDto: CreateProductDto): Promise<Result>{       
        return this.productService.createProduct(createProductDto, user.id)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    getAllProduct(@Query('count') count: number, @Query('page') page: number){
        return this.productService.getAllProduct(page,count)
    }
}
