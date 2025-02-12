import { Module } from '@nestjs/common'
import { ProductSDKModule } from '@ec-sdk'
import { ProductController } from './product.controller'

@Module({
  imports: [ProductSDKModule],
  controllers: [ProductController]
})
export class ProductModule {}
