import { Controller } from '@nestjs/common'
import { CreateProductUseCase } from '../../use-cases/create-product'
import {
  CreateProductRequest,
  ProductUseCasesControllerMethods
} from '@ec-proto'

@Controller()
@ProductUseCasesControllerMethods()
export class ProductGrpcController {
  constructor(
    private readonly executeCreateProductUseCase: CreateProductUseCase
  ) {}

  async createProductUseCase(data: CreateProductRequest) {
    console.log(
      '🚀 apps/ec-product-svc/src/controllers/v1/product.controller.ts:14 -> data: ',
      data
    )
    return this.executeCreateProductUseCase.execute(data)
  }
}
