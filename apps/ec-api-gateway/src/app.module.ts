import { ProductSDKModule } from '@ec-sdk'
import { Module } from '@nestjs/common'
import { ProductModule } from './v1/product/product.module'

@Module({
  imports: [
    ProductModule,
    //SDK
    ProductSDKModule
  ]
})
export class AppModule {}
