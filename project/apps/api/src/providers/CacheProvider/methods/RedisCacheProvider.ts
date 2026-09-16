import { Injectable } from '@nestjs/common';
import {
  ICacheProvider,
  ISetCache,
} from '../interface/CacheProvider.interface';
import { Redis } from 'ioredis';

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

export const redisConfig = {
  host: REDIS_HOST,
  port: REDIS_PORT ? parseInt(REDIS_PORT, 10) : undefined,
  password: REDIS_PASSWORD,
};

/**
 * Redis Cache Provider implementation
 * Uses Redis as the underlying memory cache
 */
@Injectable()
export class RedisCacheProvider implements ICacheProvider {
  private client: Redis;
  constructor() {
    this.client = new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password,
    });
  }

  get(key: string): Promise<any> {
    return this.client.get(key);
  }

  async set({ key, value, ttl }: ISetCache): Promise<void> {
    if (ttl) {
      await this.client.set(key, value, 'EX', ttl);
    } else {
      await this.client.set(key, value);
    }
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}
