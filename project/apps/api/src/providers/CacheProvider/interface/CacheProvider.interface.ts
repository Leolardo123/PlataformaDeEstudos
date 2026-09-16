export interface ISetCache {
  key: string;
  value: any;
  ttl?: number;
}

export interface ICacheProvider {
  get<T>(key: string): Promise<T>;
  set(options: ISetCache): Promise<void>;
  delete(key: string): Promise<void>;
}
