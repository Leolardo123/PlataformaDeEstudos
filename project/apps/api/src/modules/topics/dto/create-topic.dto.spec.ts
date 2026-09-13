import { createTopicSchema } from './create-topic.dto';

describe('createTopicSchema', () => {
  it('parses a valid payload', () => {
    const payload = createTopicSchema.parse({
      name: 'Topico 1',
      subjectId: '8e7cb6f8-1f34-45c8-a5b2-c54dbd6b5d67',
      status: 'DRAFT',
    });

    expect(payload.name).toBe('Topico 1');
  });

  it('rejects payload without subjectId', () => {
    expect(() =>
      createTopicSchema.parse({
        name: 'Topico sem materia',
      }),
    ).toThrow();
  });
});
