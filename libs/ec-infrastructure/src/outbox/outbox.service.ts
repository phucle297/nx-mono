/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Logger } from '@nestjs/common'
import { OutboxRepository } from './outbox.repository'
import { KafkaService } from '../messaging/kafka.service'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class OutboxService {
  private readonly logger = new Logger(OutboxService.name)

  constructor(
    private readonly outboxRepository: OutboxRepository,
    private readonly kafkaService: KafkaService
  ) {}

  async addEvent(
    aggregateType: string,
    aggregateId: string,
    eventType: string,
    payload: any,
    entityManager?: any
  ) {
    await this.outboxRepository.save(
      {
        aggregateType,
        aggregateId,
        eventType,
        payload,
        published: false
      },
      entityManager
    )
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async processOutboxEvents(): Promise<void> {
    this.logger.debug('Processing outbox events')

    const events = await this.outboxRepository.findUnpublishedEvents()

    for (const event of events) {
      try {
        await this.kafkaService.send({
          topic: `${event.aggregateType}.${event.eventType}`,
          messages: [
            {
              key: event.aggregateId,
              value: JSON.stringify(event.payload),
              headers: {
                eventType: event.eventType,
                timestamp: new Date().toISOString()
              }
            }
          ]
        })

        await this.outboxRepository.markAsPublished(event.id)
        this.logger.debug(`Published event ${event.id} to Kafka`)
      } catch (error) {
        this.logger.error(
          `Failed to publish event ${event.id}: ${error.message}`
        )
        await this.outboxRepository.incrementRetry(event.id, error.message)
      }
    }
  }
}
