import { Module } from '@nestjs/common';
import { ProductController } from './controllers/v1/product.controller';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [],
})
export class AppModule {}
