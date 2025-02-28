import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { OutboxEvent } from './outbox.entity'
import { OutboxRepository } from './outbox.repository'
import { OutboxService } from './outbox.service'
import { KafkaService } from '../messaging/kafka.service'
import { TransactionService } from '../transaction/transaction.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    TypeOrmModule.forFeature([OutboxEvent]),
    ScheduleModule.forRoot(),
    ConfigModule
  ],
  providers: [
    OutboxRepository,
    OutboxService,
    KafkaService,
    TransactionService
  ],
  exports: [OutboxService, KafkaService, TransactionService]
})
export class OutboxModule {}
