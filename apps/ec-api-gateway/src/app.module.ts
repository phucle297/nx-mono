import { ProductSDKModule } from '@ec-sdk'
import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { ProductModule } from './product/product.module'

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
