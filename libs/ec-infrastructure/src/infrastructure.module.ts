import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { OutboxModule } from './outbox/outbox.module'
import { OutboxEvent } from './outbox/outbox.entity'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 3306),
        username: configService.get('DB_USERNAME', 'user'),
        password: configService.get('DB_PASSWORD', 'password'),
        database: configService.get('DB_DATABASE', 'ecommerce'),
        entities: [OutboxEvent],
        synchronize: configService.get('DB_SYNCHRONIZE', false)
      })
    }),
    OutboxModule
  ],
  exports: [OutboxModule]
})
export class InfrastructureModule {}
