import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from "class-validator"


class Property{
    @ApiProperty()
    @IsString()
    key: string

    @ApiProperty()
    @IsString()
    value: string
}

export class CreateProductDto {
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty({type: [Property]})
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(100)
    @ValidateNested({each:true})
    @Type(() => Property)
    property: Property[]
}

