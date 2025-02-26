import { Controller, Post, Body, Param, Get } from '@nestjs/common'
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
    console.log(
      '🚀 apps/ec-api-gateway/src/product/controller/v1/product.controller.ts:12 -> request: ',
      request
    )

    return this.productClient.createProduct(request)
  }

  @Get()
  @ApiOperation({ summary: 'Get products' })
  getProducts(@Param() offset: number, @Param() limit: number) {
    console.log(
      '🚀 apps/ec-api-gateway/src/product/controller/v1/product.controller.ts:24 -> offset: ',
      offset,
      limit
    )

    return this.productClient.getProducts({
      limit,
      offset
    })
  }
}
