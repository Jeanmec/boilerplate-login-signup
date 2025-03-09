import { IntersectionType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { EmailDto } from 'dto/field/email.dto';
import { PasswordDto } from 'dto/field/password.dto';
import { ApiPropertyMetadata } from 'swagger/api-property-metadata';

export class LoginDto extends IntersectionType(EmailDto, PasswordDto) {
  @ApiProperty(ApiPropertyMetadata.email)
  email: string;

  @ApiProperty(ApiPropertyMetadata.password)
  password: string;
}
