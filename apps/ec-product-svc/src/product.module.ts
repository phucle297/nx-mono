import { Module } from '@nestjs/common'
import { CreateProductUseCase } from './use-cases/create-product'
import { InternalApiModule } from '@ec-application'
import { ProductGrpcCommandsController } from './controllers/v1/product-command.controller'
import { ProductsView } from './views/products-view'
import { ProductGrpcQueriesController } from './controllers/v1/product-query.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/configs/typeorm'
import { CqrsModule } from '@nestjs/cqrs'

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfig),
    CqrsModule,
    InternalApiModule
  ],
  providers: [CreateProductUseCase, ProductsView],
  controllers: [ProductGrpcCommandsController, ProductGrpcQueriesController]
})
export class ProductModule {}
