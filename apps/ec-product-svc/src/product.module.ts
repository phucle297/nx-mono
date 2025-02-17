import { Module } from '@nestjs/common'
import { CreateProductUsecase } from './use-cases/create-product'
import { CreateProductGrpcController } from './controllers/v1/product.controller'

@Module({
  imports: [],
  providers: [CreateProductUsecase],
  controllers: [CreateProductGrpcController]
})
export class ProductModule {}
