import { Prisma } from 'generated/prisma/client';
import { PrismaService } from '../prisma.service';

type UncapitalizeModelName<T extends string> = T extends string
  ? Uncapitalize<T>
  : never;

export abstract class AbstractRepository<T extends Prisma.ModelName> {
  protected ormModel: PrismaService[UncapitalizeModelName<T>];

  constructor(prisma: PrismaService, modelName: T) {
    const clientKey = (modelName.charAt(0).toLowerCase() +
      modelName.slice(1)) as UncapitalizeModelName<T>;

    if (!prisma[clientKey]) {
      throw new Error(`Model ${modelName} does not exist in PrismaService`);
    }

    this.ormModel = prisma[clientKey];
  }

  get create() {
    return this.ormModel.create.bind(
      this.ormModel,
    ) as PrismaService[UncapitalizeModelName<T>]['create'];
  }

  get findMany() {
    return this.ormModel.findMany.bind(
      this.ormModel,
    ) as PrismaService[UncapitalizeModelName<T>]['findMany'];
  }

  get findUnique() {
    return this.ormModel.findUnique.bind(
      this.ormModel,
    ) as PrismaService[UncapitalizeModelName<T>]['findUnique'];
  }

  get update() {
    return this.ormModel.update.bind(
      this.ormModel,
    ) as PrismaService[UncapitalizeModelName<T>]['update'];
  }

  get delete() {
    return this.ormModel.delete.bind(
      this.ormModel,
    ) as PrismaService[UncapitalizeModelName<T>]['delete'];
  }
}
