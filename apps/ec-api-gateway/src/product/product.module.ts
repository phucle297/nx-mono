import { Module } from '@nestjs/common'
import { ProductSDKModule } from '@ec-sdk'
import { ProductController } from './controller/v1/product.controller'

@Module({
  imports: [ProductSDKModule],
  controllers: [ProductController]
})
export class ProductModule {}
