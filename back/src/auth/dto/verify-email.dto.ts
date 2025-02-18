import { IntersectionType } from '@nestjs/mapped-types';
import { EmailVerificationCodeDto } from 'dto/field/email-verification-code.tdo';

export class VerifyEmailDto extends IntersectionType(
  EmailVerificationCodeDto,
) {}
