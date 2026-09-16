import { Module } from '@nestjs/common';
import { CacheProviderFactory } from './CacheProvider.factory';

@Module({
  providers: [
    {
      provide: 'CacheProvider',
      useFactory: CacheProviderFactory,
    },
  ],
  exports: ['CacheProvider'],
})
export class CacheProviderModule {}
