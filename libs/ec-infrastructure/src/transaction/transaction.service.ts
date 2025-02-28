import { Injectable } from '@nestjs/common'
import { DataSource, EntityManager } from 'typeorm'

@Injectable()
export class TransactionService {
  constructor(private readonly dataSource: DataSource) {}

  async executeInTransaction<T>(
    callback: (entityManager: EntityManager) => Promise<T>
  ): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const result = await callback(queryRunner.manager)
      await queryRunner.commitTransaction()
      return result
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }
}
