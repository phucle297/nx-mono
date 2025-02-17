import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { ProductClient, CreateProductRequest } from '@ec-sdk'

@ApiTags('Products')
@Controller('api/v1/products')
export class ProductController {
  constructor(private readonly productClient: ProductClient) {}

  @Post()
  @ApiOperation({ summary: 'Create new product' })
  createProduct(@Body() request: CreateProductRequest) {
    return this.productClient.createProduct(request)
  }

  //@Get()
  //@ApiOperation({ summary: 'List all products' })
  //listProducts(@Query('offset') offset = 0, @Query('limit') limit = 10) {
  //  return this.productClient.listProducts({ offset, limit })
  //}

  //@Get('search')
  //@ApiOperation({ summary: 'Search products' })
  //searchProducts(@Query('query') query: string) {
  //  return this.productClient.searchProducts(query)
  //}
  //
  //@Get(':id')
  //@ApiOperation({ summary: 'Get product by ID' })
  //getProduct(@Param('id') id: string) {
  //  return this.productClient.getProduct(id)
  //}
  //
  //@Put(':id')
  //@ApiOperation({ summary: 'Update product' })
  //updateProduct(
  //  @Param('id') id: string,
  //  @Body() request: UpdateProductRequest
  //) {
  //  return this.productClient.updateProduct({ id, ...request })
  //}
  //
  //@Delete(':id')
  //@ApiOperation({ summary: 'Delete product' })
  //deleteProduct(@Param('id') id: string) {
  //  return this.productClient.deleteProduct(id)
  //}
}
