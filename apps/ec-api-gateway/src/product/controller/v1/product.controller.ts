import { Controller, Post, Body, Get, Query } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { ProductClient } from '@ec-services-sdk'
import { CreateProductRequest } from '@ec-domain/products'

@ApiTags('Products')
@Controller('api/v1/products')
export class ProductController {
  constructor(private readonly productClient: ProductClient) {}

  @Post()
  @ApiOperation({ summary: 'Create new product' })
  createProduct(@Body() request: CreateProductRequest) {
    return this.productClient.createProduct(request)
  }

  @Get()
  @ApiOperation({ summary: 'Get products' })
  getProducts(@Query('page') page: number, @Query('limit') limit: number) {
    return this.productClient.getProducts({
      page: Number(page || 0),
      limit: Number(limit || 0)
    })
  }
}
