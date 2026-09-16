import { Module } from '@nestjs/common';
import { EmailProviderFactory } from './EmailProvider.factory';

@Module({
  providers: [
    {
      provide: 'EmailProvider',
      useFactory: EmailProviderFactory,
    },
  ],
  exports: ['EmailProvider'],
})
export class EmailProviderModule {}
