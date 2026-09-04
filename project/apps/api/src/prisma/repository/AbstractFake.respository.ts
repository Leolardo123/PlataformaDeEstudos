type BaseRecord = {
  id: string;
  createdAt: Date;
};

type BuildOnCreate<TRecord extends BaseRecord, TCreateData> = (
  data: TCreateData,
  base: BaseRecord,
) => TRecord;

type MergeOnUpdate<TRecord extends BaseRecord, TUpdateData> = (
  current: TRecord,
  data: TUpdateData,
) => TRecord;

type FindManyArgs<TRecord extends BaseRecord> = {
  where?: Partial<TRecord>;
  take?: number;
  orderBy?: unknown;
};

type FindUniqueArgs = {
  where: { id: string };
};

type CreateArgs<TCreateData> = {
  data: TCreateData;
};

type UpdateArgs<TUpdateData> = {
  where: { id: string };
  data: TUpdateData;
};

type DeleteArgs = {
  where: { id: string };
};

export class AbstractFakeRepository<
  TRecord extends BaseRecord,
  TCreateData = Partial<TRecord>,
  TUpdateData = Partial<TRecord>,
> {
  private items: TRecord[] = [];
  private idCounter = 0;

  constructor(
    private readonly options: {
      idPrefix: string;
      buildOnCreate: BuildOnCreate<TRecord, TCreateData>;
      mergeOnUpdate?: MergeOnUpdate<TRecord, TUpdateData>;
    },
  ) {}

  async create({ data }: CreateArgs<TCreateData>): Promise<TRecord> {
    this.idCounter += 1;

    const item = this.options.buildOnCreate(data, {
      id: `${this.options.idPrefix}-${this.idCounter}`,
      createdAt: new Date(1700000000000 + this.idCounter),
    });

    this.items.push(item);
    return item;
  }

  async findMany(args: FindManyArgs<TRecord> = {}): Promise<TRecord[]> {
    const filtered = args.where
      ? this.items.filter((item) =>
          this.matchesWhere(item, args.where as object),
        )
      : this.items;

    const ordered = this.applyOrderBy(filtered, args.orderBy);

    if (typeof args.take === 'number') {
      return ordered.slice(0, args.take);
    }

    return ordered;
  }

  async findUnique({ where }: FindUniqueArgs): Promise<TRecord | null> {
    return this.items.find((item) => item.id === where.id) ?? null;
  }

  async update({ where, data }: UpdateArgs<TUpdateData>): Promise<TRecord> {
    const index = this.items.findIndex((item) => item.id === where.id);

    if (index < 0) {
      throw new Error(`Record ${where.id} not found`);
    }

    const current = this.items[index];

    const updated = this.options.mergeOnUpdate
      ? this.options.mergeOnUpdate(current, data)
      : ({ ...current, ...(data as object) } as TRecord);

    this.items[index] = updated;
    return updated;
  }

  async delete({ where }: DeleteArgs): Promise<TRecord> {
    const index = this.items.findIndex((item) => item.id === where.id);

    if (index < 0) {
      throw new Error(`Record ${where.id} not found`);
    }

    const [removed] = this.items.splice(index, 1);
    return removed;
  }

  private matchesWhere(item: TRecord, where: object): boolean {
    return Object.entries(where).every(([key, value]) => {
      return (item as Record<string, unknown>)[key] === value;
    });
  }

  private applyOrderBy(items: TRecord[], orderBy: unknown): TRecord[] {
    const sorted = [...items];

    const orderByEntries = Array.isArray(orderBy)
      ? orderBy
      : orderBy
        ? [orderBy]
        : [];

    const hasCreatedAtDesc = orderByEntries.some((entry) => {
      if (!entry || typeof entry !== 'object') {
        return false;
      }

      return (entry as Record<string, unknown>).createdAt === 'desc';
    });

    if (hasCreatedAtDesc) {
      sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    return sorted;
  }
}
