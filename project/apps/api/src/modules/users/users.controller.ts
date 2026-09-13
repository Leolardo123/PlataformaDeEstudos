import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserService } from './services/create-user.service';
import { type CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  create(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return this.createUserService.execute(createUserDto);
  }
}
