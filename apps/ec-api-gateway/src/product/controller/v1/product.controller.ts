import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { ProductClient } from '@ec-services-sdk'
import { CreateProductRequest } from '@ec-proto'

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
}
