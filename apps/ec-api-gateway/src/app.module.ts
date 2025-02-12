import { Module } from '@nestjs/common'
import { ProductModule } from './v1/product/product.module'
import { ProductSDKModule } from '@ec-sdk'

@Module({
  imports: [
    ProductModule,
    // SDK
    ProductSDKModule
  ]
})
export class AppModule {}
