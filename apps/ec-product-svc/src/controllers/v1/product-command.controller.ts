import { Controller } from '@nestjs/common'
import { CreateProductUseCase } from '../../use-cases/create-product'
import {
  CreateProductRequest,
  ProductUseCasesControllerMethods
} from '@ec-domain/products'

@Controller()
@ProductUseCasesControllerMethods()
export class ProductGrpcCommandsController {
  constructor(
    private readonly executeCreateProductUseCase: CreateProductUseCase
  ) {}

  async createProductUseCase(data: CreateProductRequest) {
    return this.executeCreateProductUseCase.execute(data)
  }
}
