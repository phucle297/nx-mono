import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ProductClient } from './product-sdk.client'

@Module({
  imports: [CqrsModule],
  providers: [ProductClient],
  exports: [ProductClient]
})
export class ProductSDKModule {}
