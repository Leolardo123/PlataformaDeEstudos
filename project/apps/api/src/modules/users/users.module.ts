import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CreateUserService } from './services/create-user.service';
import UserRepository from './repository/user.repository';
import { EmailProviderModule } from 'src/providers/EmailProvider';
import { CacheProviderModule } from 'src/providers/CacheProvider';
import { ResendValidateUserEmailService } from './services/resend-validate-user-emai.service';
import { ValidateUserEmailService } from './services/validate-user-email.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserService,
    ResendValidateUserEmailService,
    ValidateUserEmailService,
    // Repository
    UserRepository,
  ],
  imports: [EmailProviderModule, CacheProviderModule, AuthModule],
})
export class UsersModule {}
