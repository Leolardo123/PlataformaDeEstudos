import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserService } from './services/create-user.service';
import {
  type ResendValidateUserEmailDto,
  type ValidateUserEmailDto,
  type CreateUserDto,
} from './dto/create-user.dto';
import { ResendValidateUserEmailService } from './services/resend-validate-user-emai.service';
import { ValidateUserEmailService } from './services/validate-user-email.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly resendValidateUserEmailService: ResendValidateUserEmailService,
    private readonly validateEmailService: ValidateUserEmailService,
  ) {}

  @Post()
  create(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return this.createUserService.execute(createUserDto);
  }

  @Post('resend-validate-email')
  resendValidateEmail(
    @Body()
    resendValidateUserEmailDto: ResendValidateUserEmailDto,
  ) {
    return this.resendValidateUserEmailService.execute(
      resendValidateUserEmailDto,
    );
  }

  @Post('validate-email')
  validateEmail(
    @Body()
    validateEmailDto: ValidateUserEmailDto,
  ) {
    return this.validateEmailService.execute(validateEmailDto);
  }
}
