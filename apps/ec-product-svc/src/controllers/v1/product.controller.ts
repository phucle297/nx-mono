import { Controller } from '@nestjs/common'
import { CreateProductUseCase } from '../../use-cases/create-product'
import { CreateProductRequest } from '@ec-proto'
import { GrpcMethod } from '@nestjs/microservices'

@Controller()
//@ProductUseCasesControllerMethods()
export class ProductGrpcController {
  constructor(
    private readonly createProductUseCaseExecute: CreateProductUseCase
  ) {}

  @GrpcMethod('ProductUseCases', 'CreateProductUseCase')
  async createProductUseCase(data: CreateProductRequest) {
    console.log(
      '🚀 apps/ec-product-svc/src/controllers/v1/product.controller.ts:14 -> data: ',
      data
    )
    return this.createProductUseCaseExecute.execute(data)
  }
}
