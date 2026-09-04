import { NotFoundException } from '@nestjs/common';
import AppError from '../../error/AppError.error';
import HttpStatusCodes from '../../error/HttpStatusCodes.error';
import { RecordStatus } from '../../../generated/prisma/enums';
import { AbstractFakeRepository } from '../../prisma/repository/AbstractFake.respository';

jest.mock('../repository/flashcard.repository', () => ({
  __esModule: true,
  default: class FlashcardRepository {},
}));

jest.mock('../../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

import { CreateFlashcardService } from './create-flashcard.service';
import { FindAllFlashcardsService } from './find-all-flashcards.service';
import { FindOneFlashcardService } from './find-one-flashcard.service';
import { RemoveFlashcardService } from './remove-flashcard.service';
import { UpdateFlashcardService } from './update-flashcard.service';

type FlashcardItem = {
  id: string;
  front: string;
  back: string;
  order?: number;
  status?: (typeof RecordStatus)[keyof typeof RecordStatus];
  topicId: string;
  createdAt: Date;
};

describe('Flashcards CRUD services', () => {
  let repository: AbstractFakeRepository<FlashcardItem, Partial<FlashcardItem>>;
  let createService: CreateFlashcardService;
  let findAllService: FindAllFlashcardsService;
  let findOneService: FindOneFlashcardService;
  let updateService: UpdateFlashcardService;
  let removeService: RemoveFlashcardService;

  beforeEach(() => {
    repository = new AbstractFakeRepository({
      idPrefix: 'flashcard',
      buildOnCreate: (data, base) => ({
        ...base,
        front: data.front ?? '',
        back: data.back ?? '',
        order: data.order,
        status: data.status,
        topicId: data.topicId ?? '',
      }),
    });

    createService = new CreateFlashcardService(repository as never);
    findAllService = new FindAllFlashcardsService(repository as never);
    findOneService = new FindOneFlashcardService(repository as never);
    updateService = new UpdateFlashcardService(repository as never);
    removeService = new RemoveFlashcardService(repository as never);
  });

  it('creates flashcard and defaults back to front', async () => {
    const created = await createService.execute({
      front: 'Conceito de átomo',
      status: RecordStatus.DRAFT,
      topicId: 'topic-1',
    });

    expect(created.front).toBe('Conceito de átomo');
    expect(created.back).toBe('Conceito de átomo');
  });

  it('finds all flashcards ordered by newest first', async () => {
    await createService.execute({
      front: 'Primeiro',
      back: 'A',
      status: RecordStatus.DRAFT,
      topicId: 'topic-1',
    });
    await createService.execute({
      front: 'Segundo',
      back: 'B',
      status: RecordStatus.DRAFT,
      topicId: 'topic-1',
    });

    const list = await findAllService.execute();

    expect(list[0]?.front).toBe('Segundo');
    expect(list[1]?.front).toBe('Primeiro');
  });

  it('updates an existing flashcard', async () => {
    const created = await createService.execute({
      front: 'Original',
      status: RecordStatus.DRAFT,
      topicId: 'topic-1',
    });

    const updated = await updateService.execute(created.id, {
      back: 'Atualizado',
      status: RecordStatus.PUBLISHED,
    });

    expect(updated.back).toBe('Atualizado');
    expect(updated.status).toBe(RecordStatus.PUBLISHED);
  });

  it('throws app error when updating a missing flashcard', async () => {
    await expect(updateService.execute('missing', { back: 'X' })).rejects.toEqual(
      expect.objectContaining<AppError>({
        message: 'Flashcard não encontrado.',
        statusCode: HttpStatusCodes.NOT_FOUND,
      }),
    );
  });

  it('removes an existing flashcard', async () => {
    const created = await createService.execute({
      front: 'Remover',
      status: RecordStatus.DRAFT,
      topicId: 'topic-1',
    });

    await removeService.execute(created.id);

    await expect(findOneService.execute(created.id)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('throws app error when removing a missing flashcard', async () => {
    await expect(removeService.execute('missing')).rejects.toEqual(
      expect.objectContaining<AppError>({
        message: 'Flashcard not found.',
        statusCode: HttpStatusCodes.NOT_FOUND,
      }),
    );
  });
});
