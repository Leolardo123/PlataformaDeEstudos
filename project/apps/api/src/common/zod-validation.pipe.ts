import {
  BadRequestException,
  Injectable,
  PipeTransform,
  type ArgumentMetadata,
} from '@nestjs/common';
import { ZodError, type ZodType } from 'zod';

@Injectable()
export class ZodValidationPipe<T = unknown> implements PipeTransform {
  constructor(private readonly schema: ZodType<T>) {}

  transform(value: unknown, metadata: ArgumentMetadata): T {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: `Validation failed for ${metadata.type}`,
          issues: error.issues,
        });
      }
      throw error;
    }
  }
}
