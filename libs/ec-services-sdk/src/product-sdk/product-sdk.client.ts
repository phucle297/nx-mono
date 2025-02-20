import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import {
  CreateProductRequest,
  PRODUCT_USE_CASES_SERVICE_NAME,
  ProductUseCasesClient
} from '@ec-proto'
import { type ClientGrpc } from '@nestjs/microservices'

@Injectable()
export class ProductClient implements OnModuleInit {
  private productUseCases: ProductUseCasesClient

  constructor(
    @Inject(PRODUCT_USE_CASES_SERVICE_NAME) private client: ClientGrpc
  ) {}
  onModuleInit() {
    this.productUseCases = this.client.getService<ProductUseCasesClient>(
      PRODUCT_USE_CASES_SERVICE_NAME
    )
  }

  async createProduct(request: CreateProductRequest) {
    console.log(
      '🚀 libs/ec-services-sdk/src/product-sdk/product-sdk.client.ts:33 -> createProduct: '
    )

    return this.productUseCases.createProductUseCase(request)
  }

  //async listProducts(request: FindAllProductRequest): Promise<ProductDto[]> {
  //  const query = new ListProductsQuery(
  //    request?.offset ?? 0,
  //    request?.limit ?? 10
  //  )
  //  return this.queryBus.execute(query)
  //}
}
