import { NotFoundException } from '@nestjs/common';
import AppError from '../../error/AppError.error';
import HttpStatusCodes from '../../error/HttpStatusCodes.error';
import { RecordStatus } from '../../../generated/prisma/enums';
import { AbstractFakeRepository } from '../../prisma/repository/AbstractFake.respository';

jest.mock('../repository/notice.repository', () => ({
  __esModule: true,
  default: class NoticeRepository {},
}));

import { CreateNoticeService } from './create-notice.service';
import { FindAllNoticesService } from './find-all-notices.service';
import { FindOneNoticeService } from './find-one-notice.service';
import { RemoveNoticeService } from './remove-notice.service';
import { UpdateNoticeService } from './update-notice.service';

type NoticeItem = {
  id: string;
  title: string;
  message: string;
  status?: (typeof RecordStatus)[keyof typeof RecordStatus];
  createdAt: Date;
};

describe('Notices CRUD services', () => {
  let repository: AbstractFakeRepository<NoticeItem, Partial<NoticeItem>>;
  let createService: CreateNoticeService;
  let findAllService: FindAllNoticesService;
  let findOneService: FindOneNoticeService;
  let updateService: UpdateNoticeService;
  let removeService: RemoveNoticeService;

  beforeEach(() => {
    repository = new AbstractFakeRepository({
      idPrefix: 'notice',
      buildOnCreate: (data, base) => ({
        ...base,
        title: data.title ?? '',
        message: data.message ?? '',
        status: data.status,
      }),
    });

    createService = new CreateNoticeService(repository as never);
    findAllService = new FindAllNoticesService(repository as never);
    findOneService = new FindOneNoticeService(repository as never);
    updateService = new UpdateNoticeService(repository as never);
    removeService = new RemoveNoticeService(repository as never);
  });

  it('creates a notice and defaults message to title', async () => {
    const created = await createService.execute({
      title: 'Novo edital',
      status: RecordStatus.DRAFT,
    });

    expect(created.title).toBe('Novo edital');
    expect(created.message).toBe('Novo edital');
  });

  it('returns notices ordered by most recent first', async () => {
    await repository.create({ data: { title: 'Primeiro', message: 'A' } });
    await repository.create({ data: { title: 'Segundo', message: 'B' } });

    const notices = await findAllService.execute();

    expect(notices[0]?.title).toBe('Segundo');
    expect(notices[1]?.title).toBe('Primeiro');
  });

  it('finds a notice by id', async () => {
    const created = await createService.execute({
      title: 'Edital de prova',
      message: 'Mensagem',
    });

    const found = await findOneService.execute(created.id);

    expect(found.id).toBe(created.id);
  });

  it('throws when finding a missing notice', async () => {
    await expect(findOneService.execute('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('updates an existing notice', async () => {
    const created = await createService.execute({ title: 'Original' });

    const updated = await updateService.execute(created.id, {
      title: 'Atualizado',
      message: 'Nova mensagem',
    });

    expect(updated.title).toBe('Atualizado');
    expect(updated.message).toBe('Nova mensagem');
  });

  it('throws app error when updating a missing notice', async () => {
    await expect(updateService.execute('missing', { title: 'Teste' })).rejects.toEqual(
      expect.objectContaining<AppError>({
        message: 'Edital não encontrado.',
        statusCode: HttpStatusCodes.NOT_FOUND,
      }),
    );
  });

  it('removes an existing notice', async () => {
    const created = await createService.execute({ title: 'Remover' });

    await removeService.execute(created.id);

    await expect(findOneService.execute(created.id)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('throws app error when removing a missing notice', async () => {
    await expect(removeService.execute('missing')).rejects.toEqual(
      expect.objectContaining<AppError>({
        message: 'Edital não encontrado.',
        statusCode: HttpStatusCodes.NOT_FOUND,
      }),
    );
  });
});
