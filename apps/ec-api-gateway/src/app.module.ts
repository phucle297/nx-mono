import { Module } from '@nestjs/common'
import { ProductModule } from './product/product.module'

@Module({
  imports: [
    //LoggerModule.forRoot({
    //  pinoHttp: {
    //    transport: {
    //      target: 'pino-pretty',
    //      options: {
    //        singleLine: true
    //      }
    //    }
    //  }
    //}),
    ProductModule
  ]
})
export class AppModule {}
