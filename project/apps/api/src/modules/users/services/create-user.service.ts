import { Inject, Injectable } from '@nestjs/common';
import { type CreateUserDto, createUserSchema } from '../dto/create-user.dto';
import UserRepository from '../repository/user.repository';
import { ValidateInput } from 'src/common/zod/zod-decorator';
import { type IEmailProvider } from 'src/providers/EmailProvider/interface/EmailProvider.interface';
import { type ICacheProvider } from 'src/providers/CacheProvider/interface/CacheProvider.interface';
import { hashGenerators } from 'src/common/helpers/hashGenerators';

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
    const hashedPassword = await hashGenerators.argon2ID(password);
    const confirmEmailToken = hashGenerators.cryptoUUID();

    await this.cacheProvider.set({
      key: `confirmEmailToken:${confirmEmailToken}`,
      value: email,
      ttl: 60 * 60, // 1 hour
    });

    const createdUser = this.userRepository.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        emailConfirmed: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailConfirmed: true,
      },
    });

    await this.emailProvider.sendEmail({
      to: email,
      subject: 'Bem-vindo à nossa plataforma',
      body: `Olá ${name}, bem-vindo à nossa plataforma!\nEstamos felizes em tê-lo conosco.\nConfirme seu email usando o token: ${confirmEmailToken}`,
    });

    return createdUser;
  }
}
