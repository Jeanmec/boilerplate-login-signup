import { EmailDto } from 'dto/field/email.dto';
import { EmailVerificationCodeDto } from 'dto/field/email-verification-code.tdo';
import { PasswordDto } from 'dto/field/password.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyMetadata } from 'swagger/api-property-metadata';

export class ResetPasswordDto extends IntersectionType(
  EmailDto,
  EmailVerificationCodeDto,
  PasswordDto,
) {
  @ApiProperty(ApiPropertyMetadata.email)
  email: string;

  @ApiProperty(ApiPropertyMetadata.emailVerificationCode)
  emailVerificationCode: string;

  @ApiProperty(ApiPropertyMetadata.password)
  password: string;
}
