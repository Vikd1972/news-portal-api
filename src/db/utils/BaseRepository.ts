import typeorm from 'typeorm';
import * as changeCase from 'change-case';

import dataSource from './dataSource';
import { ResponseErrorTypeENUM, createError } from '../../services/errorHelper';

type PrimaryKeyType = number

export type FindAndCountMetaType = {
  page: number;
  perPage: number;
  totalPages: number;
  totalRecords: number;
}

class BaseRepository<EntityType> {
  private Entity: typeorm.EntityTarget<EntityType>;

  repo: typeorm.Repository<EntityType>;

  constructor(Entity: typeorm.EntityTarget<EntityType>) {
    this.Entity = Entity;

    this.repo = dataSource.getRepository(this.Entity);
  }

  create = async (data: typeorm.DeepPartial<EntityType>): Promise<EntityType> => {
    const newItem = this.repo.create(data) as typeorm.DeepPartial<EntityType>;

    const createdItem = await this.repo.save(newItem);

    return createdItem;
  };

  bulkCreate = (
    items: EntityType[],
  ): Promise<typeorm.InsertResult> => {
    return this.repo.insert(items as EntityType[]);
  };

  createQueryBuilder = (alias?: string, queryRunner?: typeorm.QueryRunner) => {
    return this.repo.createQueryBuilder(alias, queryRunner);
  };

  query = (query: string, parameters?: unknown[]): Promise<unknown> => {
    return this.repo.query(query, parameters);
  };

  update = async (
    pk: PrimaryKeyType,
    data: typeorm.DeepPartial<EntityType>,
  ): Promise<EntityType> => {
    const item = await this.getFullObjectByPk(pk);

    if (!item) {
      throw this.getNotFoundError();
    }

    Object.keys(data).forEach((key) => {
      item[key] = data[key];
    });

    await this.repo.save(item);

    const updatedItem = await this.findByPk(pk);

    return updatedItem;
  };

  getPkName = (): string => {
    return this.repo.metadata.primaryColumns[0].propertyName;
  };

  findByPk = async (
    pk: PrimaryKeyType,
    options?: typeorm.FindOneOptions<EntityType>,
    shouldThrowError = true,
  ): Promise<EntityType> => {
    const primaryKey = this.getPkName();

    const item = await this.repo.findOne({
      ...options,
      where: {
        [primaryKey]: pk,
      } as typeorm.FindOptionsWhere<EntityType>,
    });

    if (!item && shouldThrowError) {
      throw this.getNotFoundError();
    }

    return item;
  };

  find = async (
    options?: typeorm.FindManyOptions<EntityType>,
  ): Promise<EntityType[]> => {
    const items = await this.repo.find(options);

    return items;
  };

  findOne = async (
    options?: typeorm.FindManyOptions<EntityType>,
    shouldThrowError = true,
  ): Promise<EntityType> => {
    const item = await this.repo.findOne(options);

    if (!item && shouldThrowError) {
      throw this.getNotFoundError();
    }

    return item;
  };

  findAndCount = async (
    options: typeorm.FindManyOptions<EntityType> = {},
  ): Promise<[
    EntityType[],
    FindAndCountMetaType,
  ]> => {
    const [items, count] = await this.repo.findAndCount(options);

    let page = 1;
    let perPage = null;
    let totalPages = 1;

    if (options.take) {
      perPage = options.take;
      page = ((options.skip || 0) / options.take) + 1;
      totalPages = Math.ceil(count / perPage);
    }

    return [
      items,
      {
        page,
        perPage,
        totalPages,
        totalRecords: count,
      },
    ];
  };

  count = async (
    options?: typeorm.FindManyOptions<EntityType>,
  ): Promise<number> => {
    const count = await this.repo.count(options);

    return count;
  };

  softDelete = async (pk: PrimaryKeyType): Promise<void> => {
    const item = await this.findByPk(pk);

    await this.repo.softRemove(item as typeorm.DeepPartial<EntityType>);
  };

  /**
   * !!! HARD DELETE. BE CAREFUL !!!
   * You cannot undo this action
   * @param pk Entity pk value
   */
  hardDelete = async (pk: PrimaryKeyType): Promise<void> => {
    const item = await this.findByPk(pk, { withDeleted: true });

    await this.repo.remove(item);
  };

  // eslint-disable-next-line class-methods-use-this
  getPaginationOptions = (pagination: {
    page?: number;
    perPage?: number;
  }): {
    take: number;
    skip: number;
  } => {
    let take = null;
    let skip = 0;

    if (pagination.perPage) {
      take = pagination.perPage;
      skip = take * (pagination.page - 1);
    }

    return {
      take,
      skip,
    };
  };

  private getNotFoundError = () => {
    return createError({
      type: ResponseErrorTypeENUM.notFound,
      message: `${changeCase.sentenceCase(this.repo.metadata.name)} not found`,
    });
  };

  private getAllColumnsList = () => {
    return this.repo.metadata.columns.map((i) => i.propertyName) as (keyof EntityType)[];
  };

  private getFullObjectByPk = async (pk: PrimaryKeyType): Promise<EntityType> => {
    const allColumns = this.getAllColumnsList();
    const fullItem = await this.findByPk(pk, { select: allColumns });

    return fullItem;
  };
}

export default BaseRepository;
