import { IntersectionType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { EmailDto } from 'dto/field/email.dto';
import { NameDto } from 'dto/field/name.dto';
import { PasswordDto } from 'dto/field/password.dto';
import { ApiPropertyMetadata } from 'swagger/api-property-metadata';

export class SignUpDto extends IntersectionType(
  NameDto,
  EmailDto,
  PasswordDto,
) {
  @ApiProperty(ApiPropertyMetadata.name)
  name: string;

  @ApiProperty(ApiPropertyMetadata.email)
  email: string;

  @ApiProperty(ApiPropertyMetadata.password)
  password: string;
}
