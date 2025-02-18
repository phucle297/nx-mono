import { Module } from '@nestjs/common'
import { CreateProductUseCase } from './use-cases/create-product'
import { ProductGrpcController } from './controllers/v1/product.controller'
import {
  CreateProductHandler,
  InternalApiModule,
  ListProductsHandler
} from '@ec-application'
import { ProductCreatedEvent } from '@ec-domain/products'
import { CqrsModule } from '@nestjs/cqrs'

export const CommandHandlers = [CreateProductHandler]
export const QueryHandlers = [ListProductsHandler]
export const EventHandlers = [ProductCreatedEvent]

@Module({
  imports: [CqrsModule, InternalApiModule],
  providers: [
    //...CommandHandlers,
    //...QueryHandlers,
    //...EventHandlers,
    CreateProductUseCase
  ],
  controllers: [ProductGrpcController]
})
export class ProductModule {}
