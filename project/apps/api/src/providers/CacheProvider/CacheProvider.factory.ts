import { ICacheProvider } from './interface/CacheProvider.interface';
import { RedisCacheProvider } from './methods/RedisCacheProvider';

enum CacheProviderEnum {
  REDIS = 'redis',
}

export function CacheProviderFactory(
  provider?: CacheProviderEnum,
): ICacheProvider {
  provider = CacheProviderEnum.REDIS;

  switch (provider) {
    case CacheProviderEnum.REDIS:
      try {
        return new RedisCacheProvider();
      } catch (error: any) {
        throw new Error(
          `Failed to create Redis cache provider: ${error?.message}`,
        );
      }
    default:
      throw new Error(`Unsupported cache provider: ${provider}`);
  }
}
