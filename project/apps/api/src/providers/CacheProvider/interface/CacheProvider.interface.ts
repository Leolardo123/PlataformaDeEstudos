export interface ISetCache {
  key: string;
  value: any;
  ttl?: number;
}

export interface ICacheProvider {
  get(key: string): Promise<any>;
  set(options: ISetCache): Promise<void>;
  delete(key: string): Promise<void>;
}
