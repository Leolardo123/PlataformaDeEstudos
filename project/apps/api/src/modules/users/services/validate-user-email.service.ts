import { Inject, Injectable } from '@nestjs/common';
import {
  type ValidateUserEmailDto,
  validateUserEmailSchema,
} from '../dto/create-user.dto';
import UserRepository from '../repository/user.repository';
import { ValidateInput } from 'src/common/zod/zod-decorator';
import { type IEmailProvider } from 'src/providers/EmailProvider/interface/EmailProvider.interface';
import { type ICacheProvider } from 'src/providers/CacheProvider/interface/CacheProvider.interface';
import AppError from 'src/error/AppError.error';

@Injectable()
export class ValidateUserEmailService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject('EmailProvider')
    private readonly emailProvider: IEmailProvider,
    @Inject('CacheProvider')
    private readonly cacheProvider: ICacheProvider,
  ) {}

  @ValidateInput(validateUserEmailSchema)
  async execute({ token }: ValidateUserEmailDto) {
    const tokenExists = await this.cacheProvider.get(
      `confirmEmailToken:${token}`,
    );

    if (!tokenExists) {
      throw new AppError('Token inválido ou expirado', 'NOT_FOUND');
    }

    await this.cacheProvider.delete(`confirmEmailToken:${token}`);

    const userId = tokenExists;
    const user = await this.userRepository.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('Usuário não encontrado', 'NOT_FOUND');
    }

    await this.userRepository.update({
      data: {
        emailConfirmed: true,
      },
      where: {
        id: userId,
      },
    });

    await this.emailProvider.sendEmail({
      to: user.email,
      subject: 'Confirmação de Email',
      body: 'Seu email foi confirmado com sucesso.',
    });

    return {
      userId,
      emailConfirmed: true,
    };
  }
}
