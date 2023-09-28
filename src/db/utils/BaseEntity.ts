import * as typeorm from 'typeorm';

class BaseEntity {
  @typeorm.CreateDateColumn({
    type: 'timestamp',
    select: false,
    nullable: false,
  })
  createdAt: Date;

  @typeorm.UpdateDateColumn({
    type: 'timestamp',
    select: false,
    nullable: false,
  })
  updatedAt: Date | (() => string);

  @typeorm.DeleteDateColumn({
    type: 'timestamp',
    select: false,
    nullable: true,
  })
  deletedAt?: Date;
}

export default BaseEntity;
