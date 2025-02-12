import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ProductClient } from './product-sdk.client'
import { CreateProductHandler } from '@ec-application'
import { ProductCreatedEvent } from '@ec-domain/products'

export const CommandHandlers = [CreateProductHandler]
export const QueryHandlers = []
export const EventHandlers = [ProductCreatedEvent]

@Module({
  imports: [CqrsModule],
  providers: [
    ProductClient,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers
  ],
  exports: [ProductClient]
})
export class ProductSDKModule {}
