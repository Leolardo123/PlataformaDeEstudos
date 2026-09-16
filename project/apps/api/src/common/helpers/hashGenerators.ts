import * as crypto from 'crypto';
import * as argon2 from 'argon2';

export const hashGenerators = {
  cryptoUUID(): string {
    return crypto.randomUUID();
  },
  argon2ID(phrase: string): Promise<string> {
    return argon2.hash(phrase);
  },
};
