import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a correct email' })
  email: string;
}
