import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CreateUserService } from './services/create-user.service';
import UserRepository from './repository/user.repository';
import { EmailProviderModule } from 'src/providers/EmailProvider';
import { CacheProviderModule } from 'src/providers/CacheProvider';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserService,
    // Repository
    UserRepository,
  ],
  imports: [EmailProviderModule, CacheProviderModule],
})
export class UsersModule {}
