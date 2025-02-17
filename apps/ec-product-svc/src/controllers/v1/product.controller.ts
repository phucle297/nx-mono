import { Controller } from '@nestjs/common'
import { CreateProductUsecase } from '../../use-cases/create-product'
import {
  CreateProductRequest,
  CreateProductUsecaseControllerMethods
} from '@ec-proto'

@Controller()
@CreateProductUsecaseControllerMethods()
export class CreateProductGrpcController {
  constructor(private readonly createProductUsecase: CreateProductUsecase) {}

  async execute(data: CreateProductRequest) {
    return this.createProductUsecase.execute(data)
  }
}
