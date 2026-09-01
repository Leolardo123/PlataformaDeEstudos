import { UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { Role } from '../../generated/prisma/enums';

jest.mock('@nestjs/jwt', () => ({
  JwtService: class JwtService {},
}));

jest.mock('../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const prismaMock = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const jwtMock = {
    signAsync: jest.fn().mockResolvedValue('token-123'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuthService(prismaMock as never, jwtMock as never);
  });

  it('returns token for valid admin credentials', async () => {
    const passwordHash = await argon2.hash('admin');
    prismaMock.user.findUnique
      .mockResolvedValueOnce({
        id: 'admin-1',
        name: 'Admin',
        email: 'admin@pde.com',
        role: Role.ADMIN,
        passwordHash,
      })
      .mockResolvedValueOnce({
        id: 'admin-1',
        name: 'Admin',
        email: 'admin@pde.com',
        role: Role.ADMIN,
        passwordHash,
      });

    const result = await service.login({ email: 'admin@pde.com', password: 'admin' });

    expect(result.accessToken).toBe('token-123');
    expect(result.user.email).toBe('admin@pde.com');
    expect(jwtMock.signAsync).toHaveBeenCalled();
  });

  it('throws for invalid credentials', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    await expect(
      service.login({ email: 'wrong@pde.com', password: 'wrong' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
