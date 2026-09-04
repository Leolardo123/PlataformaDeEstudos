import { NotFoundException } from '@nestjs/common';
import AppError from '../../error/AppError.error';
import HttpStatusCodes from '../../error/HttpStatusCodes.error';
import { RecordStatus } from '../../../generated/prisma/enums';
import { AbstractFakeRepository } from '../../prisma/repository/AbstractFake.respository';

jest.mock('../repository/subject.repository', () => ({
  __esModule: true,
  default: class SubjectRepository {},
}));

jest.mock('../../topics/repository/topic.repository', () => ({
  __esModule: true,
  default: class TopicRepository {},
}));

import { CreateSubjectService } from './create-subject.service';
import { FindAllSubjectsService } from './find-all-subjects.service';
import { FindOneSubjectService } from './find-one-subject.service';
import { RemoveSubjectService } from './remove-subject.service';
import { UpdateSubjectService } from './update-subject.service';

type SubjectItem = {
  id: string;
  name: string;
  description?: string;
  status?: (typeof RecordStatus)[keyof typeof RecordStatus];
  createdAt: Date;
};

describe('Subjects CRUD services', () => {
  let subjectRepository: AbstractFakeRepository<SubjectItem, Partial<SubjectItem>>;
  let topicRepository: AbstractFakeRepository<
    { id: string; subjectId: string; createdAt: Date },
    { subjectId: string }
  >;
  let createService: CreateSubjectService;
  let findAllService: FindAllSubjectsService;
  let findOneService: FindOneSubjectService;
  let updateService: UpdateSubjectService;
  let removeService: RemoveSubjectService;

  beforeEach(() => {
    subjectRepository = new AbstractFakeRepository({
      idPrefix: 'subject',
      buildOnCreate: (data, base) => ({
        ...base,
        name: data.name ?? '',
        description: data.description,
        status: data.status,
      }),
    });

    topicRepository = new AbstractFakeRepository({
      idPrefix: 'topic',
      buildOnCreate: (data, base) => ({
        ...base,
        subjectId: data.subjectId,
      }),
    });

    createService = new CreateSubjectService(subjectRepository as never);
    findAllService = new FindAllSubjectsService(subjectRepository as never);
    findOneService = new FindOneSubjectService(subjectRepository as never);
    updateService = new UpdateSubjectService(
      subjectRepository as never,
      findOneService,
    );
    removeService = new RemoveSubjectService(
      subjectRepository as never,
      topicRepository as never,
      findOneService,
    );
  });

  it('creates and finds a subject', async () => {
    const created = await createService.execute({
      name: 'Matemática',
      description: 'Base',
      status: RecordStatus.DRAFT,
    });

    const found = await findOneService.execute(created.id);

    expect(found.name).toBe('Matemática');
  });

  it('lists subjects ordered by createdAt desc', async () => {
    await createService.execute({ name: 'Primeira' });
    await createService.execute({ name: 'Segunda' });

    const subjects = await findAllService.execute();

    expect(subjects[0]?.name).toBe('Segunda');
    expect(subjects[1]?.name).toBe('Primeira');
  });

  it('updates subject data', async () => {
    const created = await createService.execute({ name: 'História' });

    const updated = await updateService.execute(created.id, {
      name: 'História Geral',
    });

    expect(updated.name).toBe('História Geral');
  });

  it('throws not found when subject does not exist', async () => {
    await expect(findOneService.execute('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('removes a subject without linked topics', async () => {
    const created = await createService.execute({ name: 'Filosofia' });

    await removeService.execute(created.id);

    await expect(findOneService.execute(created.id)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('blocks removing subject with linked topics', async () => {
    const created = await createService.execute({ name: 'Química' });
    await topicRepository.create({ data: { subjectId: created.id } });

    await expect(removeService.execute(created.id)).rejects.toEqual(
      expect.objectContaining<AppError>({
        message:
          'Não é possível remover a disciplina, pois existem tópicos associados a ela.',
        statusCode: HttpStatusCodes.BAD_REQUEST,
      }),
    );
  });
});
