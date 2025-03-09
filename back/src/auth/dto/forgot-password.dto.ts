import { IntersectionType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { EmailDto } from 'dto/field/email.dto';
import { ApiPropertyMetadata } from 'swagger/api-property-metadata';

export class ForgotPasswordDto extends IntersectionType(EmailDto) {
  @ApiProperty(ApiPropertyMetadata.email)
  email: string;
}
