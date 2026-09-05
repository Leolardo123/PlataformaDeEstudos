import { NotFoundException } from '@nestjs/common';
import { RecordStatus } from '../../../generated/prisma/enums';
import { AbstractFakeRepository } from '../../prisma/repository/AbstractFake.respository';

jest.mock('../repository/topic.repository', () => ({
  __esModule: true,
  default: class TopicRepository {},
}));

import { CreateTopicService } from './create-topic.service';
import { FindAllTopicsService } from './find-all-topics.service';
import { FindOneTopicService } from './find-one-topic.service';
import { RemoveTopicService } from './remove-topic.service';
import { UpdateTopicService } from './update-topic.service';

type TopicItem = {
  id: string;
  name: string;
  description: string | undefined;
  order: number | undefined;
  status: (typeof RecordStatus)[keyof typeof RecordStatus] | undefined;
  subjectId: string;
  createdAt: Date;
};

describe('Topics CRUD services', () => {
  let repository: AbstractFakeRepository<TopicItem, Partial<TopicItem>>;
  let createService: CreateTopicService;
  let findAllService: FindAllTopicsService;
  let findOneService: FindOneTopicService;
  let updateService: UpdateTopicService;
  let removeService: RemoveTopicService;

  beforeEach(() => {
    repository = new AbstractFakeRepository({
      idPrefix: 'topic',
      buildOnCreate: (data, base) => ({
        ...base,
        name: data.name ?? '',
        description: data.description,
        order: data.order,
        status: data.status,
        subjectId: data.subjectId ?? '',
      }),
    });

    createService = new CreateTopicService(repository as never);
    findAllService = new FindAllTopicsService(repository as never);
    findOneService = new FindOneTopicService(repository as never);
    updateService = new UpdateTopicService(repository as never, findOneService);
    removeService = new RemoveTopicService(repository as never, findOneService);
  });

  it('creates and finds a topic', async () => {
    const created = await createService.execute({
      name: 'Álgebra',
      subjectId: 'subject-1',
      order: 1,
      status: RecordStatus.PUBLISHED,
    });

    const found = await findOneService.execute(created.id);

    expect(found.name).toBe('Álgebra');
    expect(found.subjectId).toBe('subject-1');
  });

  it('finds all and filters by subjectId', async () => {
    await createService.execute({ name: 'A', subjectId: 's1' });
    await createService.execute({ name: 'B', subjectId: 's2' });

    const all = await findAllService.execute({});
    const fromS1 = await findAllService.execute({ subjectId: 's1' });

    expect(all).toHaveLength(2);
    expect(fromS1).toHaveLength(1);
    expect(fromS1[0]?.subjectId).toBe('s1');
  });

  it('updates a topic', async () => {
    const created = await createService.execute({
      name: 'Geometria',
      subjectId: 'subject-1',
    });

    const updated = await updateService.execute(created.id, {
      name: 'Geometria Plana',
    });

    expect(updated.name).toBe('Geometria Plana');
  });

  it('removes a topic', async () => {
    const created = await createService.execute({
      name: 'Trigonometria',
      subjectId: 'subject-2',
    });

    await removeService.execute(created.id);

    await expect(findOneService.execute(created.id)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('throws not found for missing topic', async () => {
    await expect(findOneService.execute('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
