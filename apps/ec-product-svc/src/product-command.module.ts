import { Module } from '@nestjs/common'
import { CreateProductUseCase } from './use-cases/create-product'
import { InternalApiModule } from '@ec-application'
import { Repositories } from 'libs/ec-application/src/internal-api.module'
import { CqrsModule } from '@nestjs/cqrs'
import { ProductGrpcCommandsController } from './controllers/v1/product-command.controller'

@Module({
  imports: [CqrsModule, InternalApiModule, Repositories],
  providers: [CreateProductUseCase],
  controllers: [ProductGrpcCommandsController]
})
export class ProductCommandModule {}
