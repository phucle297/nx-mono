import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({
    name: 'dtCreate',
    type: 'datetime',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'dtUpdate',
    type: 'datetime',
  })
  updatedAt: Date;
}
