import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger
} from '@nestjs/common'
import {
  Kafka,
  Producer,
  Consumer,
  ConsumerSubscribeTopics,
  ConsumerRunConfig
} from 'kafkajs'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly kafka: Kafka
  private readonly producer: Producer
  private readonly consumers: Consumer[] = []
  private readonly logger = new Logger(KafkaService.name)

  constructor(private readonly configService: ConfigService) {
    this.kafka = new Kafka({
      clientId: this.configService.get<string>(
        'KAFKA_CLIENT_ID',
        'ecommerce-app'
      ),
      brokers: this.configService
        .get<string>('KAFKA_BROKERS', 'localhost:9092')
        .split(','),
      retry: {
        initialRetryTime: 100,
        retries: 8
      }
    })

    this.producer = this.kafka.producer()
  }

  async onModuleInit(): Promise<void> {
    await this.producer.connect()
    this.logger.log('Kafka producer connected')
  }

  async onModuleDestroy(): Promise<void> {
    await this.producer.disconnect()

    for (const consumer of this.consumers) {
      await consumer.disconnect()
    }

    this.logger.log('Kafka producer & consumers disconnected')
  }

  async send(record: { topic: string; messages: any }): Promise<void> {
    await this.producer.send(record)
  }

  async consume(
    groupId: string,
    topics: ConsumerSubscribeTopics,
    config: ConsumerRunConfig
  ): Promise<void> {
    const consumer = this.kafka.consumer({ groupId })
    await consumer.connect()
    await consumer.subscribe(topics)
    await consumer.run(config)
    this.consumers.push(consumer)
  }
}
