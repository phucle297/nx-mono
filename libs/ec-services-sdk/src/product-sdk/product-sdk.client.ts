import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import {
  CreateProductRequest,
  PRODUCT_USE_CASES_SERVICE_NAME,
  ProductUseCasesClient,
  GetProductsRequest,
  ProductViewsClient,
  PRODUCT_VIEWS_SERVICE_NAME
} from '@ec-domain/products'
import { type ClientGrpc } from '@nestjs/microservices'

@Injectable()
export class ProductClient implements OnModuleInit {
  private productUseCases: ProductUseCasesClient
  private productViews: ProductViewsClient

  constructor(
    @Inject(PRODUCT_USE_CASES_SERVICE_NAME) private clientUseCases: ClientGrpc,
    @Inject(PRODUCT_VIEWS_SERVICE_NAME) private clientViews: ClientGrpc
  ) {}
  onModuleInit() {
    this.productUseCases =
      this.clientUseCases.getService<ProductUseCasesClient>(
        PRODUCT_USE_CASES_SERVICE_NAME
      )
    this.productViews = this.clientViews.getService<ProductViewsClient>(
      PRODUCT_VIEWS_SERVICE_NAME
    )
  }

  async createProduct(request: CreateProductRequest) {
    return this.productUseCases.createProductUseCase(request)
  }

  async getProducts(request: GetProductsRequest) {
    return this.productViews.getProducts(request)
  }
}
