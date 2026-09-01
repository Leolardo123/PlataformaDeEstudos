import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './zod-validation.pipe';

describe('ZodValidationPipe', () => {
  const schema = z.object({
    name: z.string().min(1),
    value: z.number().int(),
  });

  it('parses valid payload', () => {
    const pipe = new ZodValidationPipe(schema);
    const payload = pipe.transform(
      { name: 'A', value: 1 },
      { type: 'body', metatype: Object, data: '' },
    );
    expect(payload).toEqual({ name: 'A', value: 1 });
  });

  it('throws bad request for invalid payload', () => {
    const pipe = new ZodValidationPipe(schema);
    expect(() =>
      pipe.transform(
        { name: '', value: 'x' },
        { type: 'body', metatype: Object, data: '' },
      ),
    ).toThrow(BadRequestException);
  });
});
