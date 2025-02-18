import { IntersectionType } from '@nestjs/mapped-types';
import { EmailDto } from 'dto/field/email.dto';
import { PasswordDto } from 'dto/field/password.dto';

export class LoginDto extends IntersectionType(EmailDto, PasswordDto) {}
