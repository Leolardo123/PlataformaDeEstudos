import { createQuestionSchema } from './create-question.dto';

describe('createQuestionSchema', () => {
  it('parses a minimal valid payload', () => {
    const payload = createQuestionSchema.parse({
      statement: 'Questao de teste',
    });

    expect(payload.statement).toBe('Questao de teste');
  });

  it('rejects payload with invalid topic id', () => {
    expect(() =>
      createQuestionSchema.parse({
        statement: 'Questao de teste',
        topicIds: ['not-a-uuid'],
      }),
    ).toThrow();
  });
});
