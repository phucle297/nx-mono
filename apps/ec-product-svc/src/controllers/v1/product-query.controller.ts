import { Controller } from '@nestjs/common'
import { ProductsView } from '../../views/products-view'
import {
  GetProductByIdRequest,
  GetProductsRequest,
  ProductViewsControllerMethods
} from '@ec-domain/products'

@Controller()
@ProductViewsControllerMethods()
export class ProductGrpcQueriesController {
  constructor(private readonly executeProductViews: ProductsView) {}

  //@GrpcMethod('ProductViews', 'GetProducts')
  async getProducts(query: GetProductsRequest) {
    console.log(
      '🚀 apps/ec-product-svc/src/controllers/v1/product.controller.ts:28 -> query: ',
      query
    )
    return this.executeProductViews.execute(query)
  }

  //@GrpcMethod('ProductViews', 'GetProductById')
  async getProductById(query: GetProductByIdRequest) {
    console.log(
      '🚀 apps/ec-product-svc/src/controllers/v1/product.controller.ts:31 -> query: ',
      query
    )
  }
}
