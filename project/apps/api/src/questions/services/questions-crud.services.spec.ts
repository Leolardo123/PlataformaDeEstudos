import { NotFoundException } from '@nestjs/common';
import {
  Difficulty,
  QuestionType,
  RecordStatus,
} from '../../../generated/prisma/enums';
import { AbstractFakeRepository } from '../../prisma/repository/AbstractFake.respository';

jest.mock('../repository/question.repository', () => ({
  __esModule: true,
  default: class QuestionRepository {},
}));

import { CreateQuestionService } from './create-question.service';
import { FindAllQuestionsService } from './find-all-questions.service';
import { FindOneQuestionService } from './find-one-question.service';
import { RemoveQuestionService } from './remove-question.service';
import { UpdateQuestionService } from './update-question.service';

type AlternativeItem = {
  text: string;
  order: number;
  isCorrect: boolean;
};

type QuestionItem = {
  id: string;
  statement: string;
  type?: (typeof QuestionType)[keyof typeof QuestionType];
  difficulty?: (typeof Difficulty)[keyof typeof Difficulty];
  explanation?: string;
  status?: (typeof RecordStatus)[keyof typeof RecordStatus];
  alternatives: AlternativeItem[];
  topics: Array<{ topicId: string }>;
  createdAt: Date;
};

type QuestionCreateData = {
  statement: string;
  type?: QuestionItem['type'];
  difficulty?: QuestionItem['difficulty'];
  explanation?: string;
  status?: QuestionItem['status'];
  alternatives?: { create: AlternativeItem[] };
  topics?: { createMany: { data: Array<{ topicId: string }> } };
};

type QuestionUpdateData = {
  statement?: string;
  type?: QuestionItem['type'];
  difficulty?: QuestionItem['difficulty'];
  explanation?: string;
  status?: QuestionItem['status'];
  alternatives?: { create: AlternativeItem[] };
  topics?: { createMany: { data: Array<{ topicId: string }> } };
};

describe('Questions CRUD services', () => {
  let repository: AbstractFakeRepository<
    QuestionItem,
    QuestionCreateData,
    QuestionUpdateData
  >;
  let createService: CreateQuestionService;
  let findAllService: FindAllQuestionsService;
  let findOneService: FindOneQuestionService;
  let updateService: UpdateQuestionService;
  let removeService: RemoveQuestionService;

  beforeEach(() => {
    repository = new AbstractFakeRepository({
      idPrefix: 'question',
      buildOnCreate: (data, base) => ({
        ...base,
        statement: data.statement,
        type: data.type,
        difficulty: data.difficulty,
        explanation: data.explanation,
        status: data.status,
        alternatives: data.alternatives?.create ?? [],
        topics: data.topics?.createMany.data ?? [],
      }),
      mergeOnUpdate: (current, data) => ({
        ...current,
        ...data,
        alternatives: data.alternatives?.create ?? current.alternatives,
        topics: data.topics?.createMany.data ?? current.topics,
      }),
    });

    createService = new CreateQuestionService(repository as never);
    findAllService = new FindAllQuestionsService(repository as never);
    findOneService = new FindOneQuestionService(repository as never);
    updateService = new UpdateQuestionService(
      repository as never,
      findOneService,
    );
    removeService = new RemoveQuestionService(
      repository as never,
      findOneService,
    );
  });

  it('creates a question with default alternative values', async () => {
    const created = await createService.execute({
      statement: 'Quanto é 2 + 2?',
      type: QuestionType.MULTIPLE_CHOICE,
      difficulty: Difficulty.EASY,
      status: RecordStatus.DRAFT,
      topicIds: ['topic-1'],
      alternatives: [{ text: '4' }, { text: '5', isCorrect: false }],
    });

    expect(created.alternatives[0]).toEqual({
      text: '4',
      order: 0,
      isCorrect: false,
    });
    expect(created.topics).toEqual([{ topicId: 'topic-1' }]);
  });

  it('returns all questions ordered by newest first', async () => {
    await createService.execute({ statement: 'Q1' });
    await createService.execute({ statement: 'Q2' });

    const questions = await findAllService.execute();

    expect(questions[0]?.statement).toBe('Q2');
    expect(questions[1]?.statement).toBe('Q1');
  });

  it('updates question payload replacing topics and alternatives', async () => {
    const created = await createService.execute({
      statement: 'Capital do Brasil?',
      alternatives: [
        { text: 'Rio de Janeiro' },
        { text: 'Brasília', isCorrect: true },
      ],
      topicIds: ['topic-a'],
    });

    const updated = await updateService.execute(created.id, {
      statement: 'Capital do Brasil (atualizada)?',
      alternatives: [{ text: 'Brasília', isCorrect: true }],
      topicIds: ['topic-b', 'topic-c'],
    });

    expect(updated.statement).toBe('Capital do Brasil (atualizada)?');
    expect(updated.alternatives).toHaveLength(1);
    expect(updated.topics).toEqual([
      { topicId: 'topic-b' },
      { topicId: 'topic-c' },
    ]);
  });

  it('removes a question', async () => {
    const created = await createService.execute({
      statement: 'Remover questão',
    });

    await removeService.execute(created.id);

    await expect(findOneService.execute(created.id)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('throws not found when question does not exist', async () => {
    await expect(findOneService.execute('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
