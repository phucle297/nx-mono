import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { CreateProductRequest } from './type'
import {
  CREATE_PRODUCT_USECASE_SERVICE_NAME,
  CreateProductUsecaseClient
} from '@ec-proto'
import { ClientGrpc } from '@nestjs/microservices'

@Injectable()
export class ProductClient implements OnModuleInit {
  private createServiceUsecase: CreateProductUsecaseClient

  constructor(
    @Inject(CREATE_PRODUCT_USECASE_SERVICE_NAME) private client: ClientGrpc
  ) {}
  onModuleInit() {
    this.createServiceUsecase =
      this.client.getService<CreateProductUsecaseClient>(
        CREATE_PRODUCT_USECASE_SERVICE_NAME
      )
  }

  async createProduct(request: CreateProductRequest) {
    this.createServiceUsecase.execute(request)
  }

  //async listProducts(request: FindAllProductRequest): Promise<ProductDto[]> {
  //  const query = new ListProductsQuery(
  //    request?.offset ?? 0,
  //    request?.limit ?? 10
  //  )
  //  return this.queryBus.execute(query)
  //}
}
