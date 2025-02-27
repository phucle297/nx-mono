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

  async getProducts(query: GetProductsRequest) {
    return this.executeProductViews.execute(query)
  }

  async getProductById(query: GetProductByIdRequest) {
    console.log(
      '🚀 apps/ec-product-svc/src/controllers/v1/product.controller.ts:31 -> query: ',
      query
    )
  }
}
