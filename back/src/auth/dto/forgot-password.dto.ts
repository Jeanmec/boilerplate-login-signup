import { IntersectionType } from '@nestjs/mapped-types';
import { EmailDto } from 'dto/field/email.dto';

export class ForgotPasswordDto extends IntersectionType(EmailDto) {}
