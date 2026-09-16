import { Inject, Injectable } from '@nestjs/common';
import { type ICacheProvider } from 'src/providers/CacheProvider/interface/CacheProvider.interface';
import { type IEmailProvider } from 'src/providers/EmailProvider/interface/EmailProvider.interface';
import { ResendValidateUserEmailDto } from '../dto/create-user.dto';
import UserRepository from '../repository/user.repository';
import AppError from 'src/error/AppError.error';
import { frontendConfig } from 'config/variables';

@Injectable()
export class ResendValidateUserEmailService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject('EmailProvider')
    private readonly emailProvider: IEmailProvider,
    @Inject('CacheProvider')
    private readonly cacheProvider: ICacheProvider,
  ) {}
  async execute({ email, role }: ResendValidateUserEmailDto) {
    const userExists = await this.userRepository.findUnique({
      where: { email },
    });

    if (!userExists) {
      throw new AppError('Usuário/E-mail não encontrado', 'NOT_FOUND');
    }

    const confirmEmailToken = Math.random().toString(36).substring(2, 15);

    await this.cacheProvider.set({
      key: `confirmEmailToken:${confirmEmailToken}`,
      value: userExists.id,
      ttl: 60 * 60, // 1 hour
    });

    await this.emailProvider.sendEmail({
      to: email,
      subject: 'Bem-vindo à nossa plataforma',
      body: `Olá ${userExists.name}, bem-vindo à nossa plataforma!\nEstamos felizes em tê-lo conosco.\nConfirme seu email clicando no link: ${frontendConfig.studentUrl}/confirm-email?token=${confirmEmailToken}`,
    });
  }
}
