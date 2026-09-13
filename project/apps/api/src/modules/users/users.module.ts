import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CreateUserService } from './services/create-user.service';
import UserRepository from './repository/user.repository';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserService,
    // Repository
    UserRepository,
  ],
})
export class UsersModule {}
