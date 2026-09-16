import { Inject, Injectable } from '@nestjs/common';
import { type CreateUserDto, createUserSchema } from '../dto/create-user.dto';
import UserRepository from '../repository/user.repository';
import { ValidateInput } from 'src/common/zod/zod-decorator';
import { type IEmailProvider } from 'src/providers/EmailProvider/interface/EmailProvider.interface';
import { type ICacheProvider } from 'src/providers/CacheProvider/interface/CacheProvider.interface';
import { hashGenerators } from 'src/common/helpers/hashGenerators';
import AppError from 'src/error/AppError.error';
import { frontendConfig } from 'config/variables';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject('EmailProvider')
    private readonly emailProvider: IEmailProvider,
    @Inject('CacheProvider')
    private readonly cacheProvider: ICacheProvider,
  ) {}

  @ValidateInput(createUserSchema)
  async execute({ name, email, password }: CreateUserDto) {
    const userExists = await this.userRepository.findUnique({
      where: { email },
      select: {
        id: true,
      },
    });

    if (userExists) {
      throw new AppError('E-mail já cadastrado', 'BAD_REQUEST');
    }

    const hashedPassword = await hashGenerators.argon2ID(password);
    const confirmEmailToken = hashGenerators.cryptoUUID();

    const createdUser = await this.userRepository.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        emailConfirmed: false,
        role: 'STUDENT',
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailConfirmed: true,
      },
    });

    if (!createdUser?.id) {
      throw new AppError('Erro ao criar usuário', 'INTERNAL_SERVER_ERROR');
    }

    await this.cacheProvider.set({
      key: `confirmEmailToken:${confirmEmailToken}`,
      value: createdUser.id,
      ttl: 60 * 60, // 1 hour
    });

    await this.emailProvider.sendEmail({
      to: email,
      subject: 'Bem-vindo à nossa plataforma',
      body: `Olá ${name}, bem-vindo à nossa plataforma!\nEstamos felizes em tê-lo conosco.\nConfirme seu email clicando no link: ${frontendConfig.studentUrl}/confirm-email?token=${confirmEmailToken}`,
    });

    return { user: createdUser };
  }
}
