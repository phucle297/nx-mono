import { ProductSDKModule } from '@ec-sdk'
import { Module } from '@nestjs/common'
import { ProductModule } from './v1/product/product.module'
import { LoggerModule } from 'nestjs-pino'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true
          }
        }
      }
    }),
    ProductModule,
    //SDK
    ProductSDKModule
  ]
})
export class AppModule {}
