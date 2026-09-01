import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../../generated/prisma/enums';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import type { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateAdminCredentials(dto.email, dto.password);
    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  private async validateAdminCredentials(email: string, password: string) {
    await this.ensureDefaultAdmin(email, password);

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordValid = await argon2.verify(user.passwordHash, password);
    if (!isPasswordValid || user.role !== Role.ADMIN) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return user;
  }

  private async ensureDefaultAdmin(email: string, password: string) {
    const defaultEmail = process.env.ADMIN_EMAIL ?? 'admin@pde.com';
    const defaultPassword = process.env.ADMIN_PASSWORD ?? 'admin';

    if (email !== defaultEmail || password !== defaultPassword) {
      return;
    }

    const existing = await this.prisma.user.findUnique({
      where: { email: defaultEmail },
    });

    if (existing) {
      return;
    }

    const passwordHash = await argon2.hash(defaultPassword);
    await this.prisma.user.create({
      data: {
        name: 'Administrador',
        email: defaultEmail,
        passwordHash,
        role: Role.ADMIN,
      },
    });
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user || user.role !== Role.ADMIN) {
      throw new UnauthorizedException('Invalid token.');
    }

    return user;
  }
}
