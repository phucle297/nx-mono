import { Module } from '@nestjs/common'
import { CreateProductUseCase } from './use-cases/create-product'
import { ProductGrpcController } from './controllers/v1/product.controller'
import { InternalApiModule } from '@ec-application'
import { Repositories } from 'libs/ec-application/src/internal-api.module'
import { CqrsModule } from '@nestjs/cqrs'

@Module({
  imports: [CqrsModule, InternalApiModule, Repositories],
  providers: [CreateProductUseCase],
  controllers: [ProductGrpcController]
})
export class ProductModule {}
