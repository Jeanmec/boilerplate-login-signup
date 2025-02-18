import { IntersectionType } from '@nestjs/mapped-types';
import { EmailDto } from 'dto/field/email.dto';
import { NameDto } from 'dto/field/name.dto';
import { PasswordDto } from 'dto/field/password.dto';

export class SignUpDto extends IntersectionType(
  NameDto,
  EmailDto,
  PasswordDto,
) {}
