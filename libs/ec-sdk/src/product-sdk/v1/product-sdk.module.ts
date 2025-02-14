import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ProductClient } from './product-sdk.client'
import {
  CreateProductHandler,
  InternalApiModule,
  ListProductsHandler
} from '@ec-application'
import { ProductCreatedEvent } from '@ec-domain/products'
import { RepositoryProviders } from 'libs/ec-application/src/internal-api.module'

export const CommandHandlers = [CreateProductHandler]
export const QueryHandlers = [ListProductsHandler]
export const EventHandlers = [ProductCreatedEvent]

@Module({
  imports: [CqrsModule, InternalApiModule],
  providers: [
    ProductClient,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    ...RepositoryProviders
  ],
  exports: [ProductClient]
})
export class ProductSDKModule {}
