import { Module } from '@nestjs/common'
import { InternalApiModule } from '@ec-application'
import { Repositories } from 'libs/ec-application/src/internal-api.module'
import { CqrsModule } from '@nestjs/cqrs'
import { ProductsView } from './views/products-view'
import { ProductGrpcQueriesController } from './controllers/v1/product-query.controller'

@Module({
  imports: [CqrsModule, InternalApiModule, Repositories],
  providers: [ProductsView],
  controllers: [ProductGrpcQueriesController]
})
export class ProductQueryModule {}
