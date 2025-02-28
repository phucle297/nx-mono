import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm'

@Entity('outbox_events')
export class OutboxEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 255 })
  aggregateType: string

  @Column({ type: 'varchar', length: 255 })
  aggregateId: string

  @Column({ type: 'varchar', length: 255 })
  eventType: string

  @Column({ type: 'json' })
  payload: any

  @Column({ default: false })
  published: boolean

  @CreateDateColumn()
  createdAt: Date

  @Column({ nullable: true })
  publishedAt: Date

  @Column({ nullable: true, type: 'varchar', length: 255 })
  error: string

  @Column({ default: 0 })
  retryCount: number
}
