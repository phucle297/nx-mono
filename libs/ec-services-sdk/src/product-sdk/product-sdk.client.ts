import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import {
  CreateProductRequest,
  PRODUCT_USE_CASES_SERVICE_NAME,
  ProductUseCasesClient,
  ProductViewsClient,
  GetProductsRequest,
  PRODUCT_VIEWS_SERVICE_NAME
} from '@ec-domain/products'
import { type ClientGrpc } from '@nestjs/microservices'

@Injectable()
export class ProductClient implements OnModuleInit {
  private productUseCases: ProductUseCasesClient
  private productViews: ProductViewsClient

  constructor(
    @Inject(PRODUCT_USE_CASES_SERVICE_NAME) private client: ClientGrpc
  ) {}
  onModuleInit() {
    this.productUseCases = this.client.getService<ProductUseCasesClient>(
      PRODUCT_USE_CASES_SERVICE_NAME
    )
    this.productViews = this.client.getService<ProductViewsClient>(
      PRODUCT_VIEWS_SERVICE_NAME
    )
  }

  async createProduct(request: CreateProductRequest) {
    console.log(
      '🚀 libs/ec-services-sdk/src/product-sdk/product-sdk.client.ts:33 -> createProduct: '
    )

    return this.productUseCases.createProductUseCase(request)
  }

  async getProducts(request: GetProductsRequest) {
    this.productViews.getProducts(request)
  }
}
