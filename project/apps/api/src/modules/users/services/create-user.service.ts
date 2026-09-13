import { Injectable } from '@nestjs/common';
import { type CreateUserDto, createUserSchema } from '../dto/create-user.dto';
import UserRepository from '../repository/user.repository';
import * as argon2 from 'argon2';
import { ValidateInput } from 'src/common/zod/zod-decorator';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  @ValidateInput(createUserSchema)
  async execute({ name, email, password }: CreateUserDto) {
    const hashedPassword = await argon2.hash(password);

    return this.userRepository.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      },
    });
  }
}
