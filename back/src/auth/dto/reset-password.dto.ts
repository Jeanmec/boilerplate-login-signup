import { EmailDto } from 'dto/field/email.dto';
import { EmailVerificationCodeDto } from 'dto/field/email-verification-code.tdo';
import { PasswordDto } from 'dto/field/password.dto';
import { IntersectionType } from '@nestjs/mapped-types';

export class ResetPasswordDto extends IntersectionType(
  EmailDto,
  EmailVerificationCodeDto,
  PasswordDto,
) {}
