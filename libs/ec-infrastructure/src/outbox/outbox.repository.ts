import { Injectable } from '@nestjs/common'
import { Repository, EntityManager } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { OutboxEvent } from './outbox.entity'

@Injectable()
export class OutboxRepository {
  constructor(
    @InjectRepository(OutboxEvent)
    private readonly outboxRepository: Repository<OutboxEvent>
  ) {}

  async save(
    outboxEvent: Partial<OutboxEvent>,
    entityManager?: EntityManager
  ): Promise<OutboxEvent> {
    if (entityManager) {
      return entityManager.save(OutboxEvent, outboxEvent)
    }
    return this.outboxRepository.save(outboxEvent)
  }

  async findUnpublishedEvents(limit = 100): Promise<OutboxEvent[]> {
    return this.outboxRepository.find({
      where: { published: false },
      order: { createdAt: 'ASC' },
      take: limit
    })
  }

  async markAsPublished(id: string): Promise<void> {
    await this.outboxRepository.update(id, {
      published: true,
      publishedAt: new Date()
    })
  }

  async incrementRetry(id: string, error: string): Promise<void> {
    await this.outboxRepository.update(id, {
      retryCount: () => 'retry_count + 1',
      error
    })
  }
}
